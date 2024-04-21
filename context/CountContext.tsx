"use client";
import { setCookie } from "cookies-next";
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
  personal: number;
  onUwuified: () => void;
};

const CountContext = createContext<CountContextType>({
  global: 0,
  personal: 0,
  onUwuified: () => {},
});

export const useCount = () => {
  return useContext(CountContext);
};

type CountProviderProps = {
  initialGlobal: number;
  initialPersonal: number;
  children: ReactNode;
};

export const CountProvider = ({
  initialGlobal,
  initialPersonal,
  children,
}: CountProviderProps) => {
  const [offset, setOffset] = useState(0);
  const [global, setGlobal] = useState(initialGlobal);
  const [personal, setPersonal] = useState(initialPersonal);

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
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

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
  });

  return (
    <CountContext.Provider value={{ global, personal, onUwuified }}>
      {children}
    </CountContext.Provider>
  );
};
