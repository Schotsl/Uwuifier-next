"use client";

import Uwuifier from "uwuifier";

import { useRouter } from "next/navigation";
import { Language, State } from "@/types";
import { getValue, setValue } from "@/helper";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type UwuifierContextType = {
  uwuifySentence: (sentence: string) => string;
  unuwuifySentence: (sentence: string) => Promise<string>;
  translateSentence: (sentence: string) => Promise<string>;

  updateValue: (name: string, value: number) => void;
  updateTranslation: (translation: Language) => void;

  error: string;
  state: State;
  language: Language;

  faces: number;
  words: number;
  actions: number;
  stutters: number;
  exclamations: number;
};

const UwuifierContext = createContext<UwuifierContextType>({
  uwuifySentence: (sentence: string) => sentence,
  unuwuifySentence: async (sentence: string) => sentence,
  translateSentence: async (sentence: string) => sentence,

  updateValue: () => {},
  updateTranslation: () => {},

  error: "",
  state: State.IDLE,
  language: Language.ORG_TO_UWU,

  faces: 0.5,
  words: 1,
  actions: 0.075,
  stutters: 0.1,
  exclamations: 0.5,
});

export const useUwuifier = () => {
  return useContext(UwuifierContext);
};

type UwuifierProviderProps = {
  children: ReactNode;
};

export const UwuifierProvider = ({ children }: UwuifierProviderProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialFaces = getValue<number>(params, "faces", 0.5);
  const initialWords = getValue<number>(params, "words", 1);
  const initialActions = getValue<number>(params, "actions", 0.075);
  const initialStutters = getValue<number>(params, "stutters", 0.1);
  const initialExclamations = getValue<number>(params, "exclamations", 0.5);

  const [faces, setFaces] = useState(initialFaces);
  const [words, setWords] = useState(initialWords);
  const [actions, setActions] = useState(initialActions);
  const [stutters, setStutters] = useState(initialStutters);
  const [exclamations, setExclamations] = useState(initialExclamations);

  const [error, setError] = useState("");
  const [state, setState] = useState(State.IDLE);
  const [abort, setAbort] = useState<AbortController | null>(null);

  const [language, setLanguage] = useState(Language.ORG_TO_UWU);
  const [uwuifier, setUwuifier] = useState(
    new Uwuifier({
      spaces: {
        faces: initialFaces,
        actions: initialActions,
        stutters: initialStutters,
      },
      words: initialWords,
      exclamations: initialExclamations,
    }),
  );

  useEffect(() => {
    const uwuifier = new Uwuifier({
      spaces: {
        faces,
        actions,
        stutters,
      },
      words,
      exclamations,
    });

    setUwuifier(uwuifier);
  }, [words, faces, actions, stutters, exclamations]);

  async function translateSentence(input: string) {
    const output =
      language === Language.UWU_TO_ORG
        ? await unuwuifySentence(input)
        : uwuifySentence(input);

    return output;
  }

  function uwuifySentence(input: string) {
    return uwuifier.uwuifySentence(input);
  }

  async function unuwuifySentence(input: string) {
    if (abort) {
      abort.abort();
    }

    const controller = new AbortController();
    setAbort(controller);
    setState(State.LOADING);

    const url = `https://rqautahsvsoneozemjth.supabase.co/functions/v1/un-uwuifier`;

    const body = JSON.stringify({ input });
    const method = "POST";
    const signal = controller.signal;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await fetch(url, { body, method, headers, signal });
      const responseJSON = await response.json();

      if (responseJSON.error) {
        setError(responseJSON.error);
        setState(State.ERROR);
        return;
      }

      setState(State.SUCCESS);
      setAbort(null);

      return responseJSON.output;
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }

      setError(error.message);
      setState(State.ERROR);
    }
  }

  function updateValue(name: string, value: number) {
    if (name === "faces") {
      setFaces(value);
    } else if (name === "actions") {
      setActions(value);
    } else if (name === "stutters") {
      setStutters(value);
    } else if (name === "words") {
      setWords(value);
    } else if (name === "exclamations") {
      setExclamations(value);
    }

    const updated = setValue(params, name, value);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  }

  function updateTranslation(translation: Language) {
    setLanguage(translation);

    const updated = setValue(params, "translation", translation);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  }

  return (
    <UwuifierContext.Provider
      value={{
        uwuifySentence,
        unuwuifySentence,
        translateSentence,
        updateValue,
        updateTranslation,
        error,
        state,
        language,
        faces,
        words,
        actions,
        stutters,
        exclamations,
      }}
    >
      {children}
    </UwuifierContext.Provider>
  );
};
