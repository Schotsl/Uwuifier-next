"use client";

import { setCookie, getCookie } from "cookies-next";
import { usePlausible } from "next-plausible";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type CountContextType = {
  global: number;
  globalLoading: boolean;

  personal: number;
  personalLoading: boolean;

  onUwuified: () => void;
};

const CountContext = createContext<CountContextType>({
  global: 0,
  globalLoading: true,

  personal: 0,
  personalLoading: true,

  onUwuified: () => {},
});

export const useCount = () => {
  return useContext(CountContext);
};

type CountProviderProps = {
  children: ReactNode;
};

export const CountProvider = ({ children }: CountProviderProps) => {
  const [offset, setOffset] = useState(0);
  const [global, setGlobal] = useState(0);
  const [globalLoading, setGlobalLoading] = useState(true);

  const [personal, setPersonal] = useState(0);
  const [personalLoading, setPersonalLoading] = useState(true);

  const supabase = createClientComponentClient();
  const plausible = usePlausible();

  const subscribeCount = () => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          table: "statistics",
          schema: "public",
        },
        (payload: any) => {
          setGlobal(payload.new.uwuified_sentence - offset);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const loadStatistics = async () => {
    const { data, error } = await supabase
      .from("statistics")
      .select("uwuified_sentence")
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return;
    }

    setGlobal(data.uwuified_sentence - offset);
    setGlobalLoading(false);
  };

  function loadPersonal() {
    const personal = getCookie("personal") || "0";
    const personalParsed = parseInt(personal!);

    setPersonal(personalParsed);
    setPersonalLoading(false);
  }

  const onUwuified = () => {
    setOffset((previous) => previous + 1);
    setPersonal((previous) => {
      const personalIncreased = previous + 1;
      const personalStringified = personalIncreased.toString();

      // Update personal count to cookie
      setCookie("personal", personalStringified, {
        sameSite: "strict",
      });

      plausible("Uwuified sentence");

      if (personalIncreased == 25) plausible("Uwuified 25 sentences");
      if (personalIncreased == 50) plausible("Uwuified 50 sentences");
      if (personalIncreased == 100) plausible("Uwuified 100 sentences");
      if (personalIncreased == 250) plausible("Uwuified 250 sentences");
      if (personalIncreased == 500) plausible("Uwuified 500 sentences");

      return personalIncreased;
    });
  };

  useEffect(() => {
    subscribeCount();

    loadPersonal();
    loadStatistics();
  });

  return (
    <CountContext.Provider
      value={{ global, globalLoading, personal, personalLoading, onUwuified }}
    >
      {children}
    </CountContext.Provider>
  );
};
