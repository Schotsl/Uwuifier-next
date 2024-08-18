"use client";

import Uwuifier from "uwuifier";
import { useRouter } from "next/navigation";
import { Language, State } from "@/types";
import { getValue, setValue, setValues } from "@/helper";
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

  resetValues: () => void;
  updateValues: (updates: { name: string; value: number | Language }[]) => void;
  switchLanguage: () => void;

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

  resetValues: () => {},
  updateValues: () => {},
  switchLanguage: () => {},

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
  const defaults = {
    faces: 0.5,
    words: 1,
    actions: 0.075,
    stutters: 0.1,
    exclamations: 0.5,
    language: Language.ORG_TO_UWU,
  };

  const initialFaces = getValue<number>(params, "faces", defaults.faces);
  const initialWords = getValue<number>(params, "words", defaults.words);
  const initialActions = getValue<number>(params, "actions", defaults.actions);
  const initialStutters = getValue<number>(
    params,
    "stutters",
    defaults.stutters
  );
  const initialExclamations = getValue<number>(
    params,
    "exclamations",
    defaults.exclamations
  );
  const initialLanguage = getValue<Language>(
    params,
    "language",
    defaults.language
  );

  const [faces, setFaces] = useState(initialFaces);
  const [words, setWords] = useState(initialWords);
  const [actions, setActions] = useState(initialActions);
  const [stutters, setStutters] = useState(initialStutters);
  const [exclamations, setExclamations] = useState(initialExclamations);
  const [language, setLanguage] = useState(initialLanguage);

  const [error, setError] = useState("");
  const [state, setState] = useState(State.IDLE);
  const [abort, setAbort] = useState<AbortController | null>(null);

  const [uwuifier, setUwuifier] = useState(
    new Uwuifier({
      spaces: {
        faces: initialFaces,
        actions: initialActions,
        stutters: initialStutters,
      },
      words: initialWords,
      exclamations: initialExclamations,
    })
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
    // If the input is empty we don't need to translate anything
    if (!input.trim()) {
      return input;
    }

    // Otherwise we'll translate the input
    return language === Language.UWU_TO_ORG
      ? await unuwuifySentence(input)
      : uwuifySentence(input);
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

    const url = `/api/un-uwuifier`;
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

  function resetValues() {
    updateValues([
      { name: "faces", value: defaults.faces },
      { name: "words", value: defaults.words },
      { name: "actions", value: defaults.actions },
      { name: "stutters", value: defaults.stutters },
      { name: "exclamations", value: defaults.exclamations },
    ]);
  }

  function updateValues(updates: { name: string; value: number | Language }[]) {
    let newFaces = faces;
    let newWords = words;
    let newActions = actions;
    let newStutters = stutters;
    let newExclamations = exclamations;
    let newLanguage = language;

    const values = updates.map(({ name, value }) => {
      if (name === "faces") {
        newFaces = value as number;
      } else if (name === "actions") {
        newActions = value as number;
      } else if (name === "stutters") {
        newStutters = value as number;
      } else if (name === "words") {
        newWords = value as number;
      } else if (name === "exclamations") {
        newExclamations = value as number;
      } else if (name === "language") {
        newLanguage = value as Language;
      }

      return {
        name,
        value:
          defaults[name as keyof typeof defaults] === value ? undefined : value,
      };
    });

    const updated = setValues(params, values);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });

    setFaces(newFaces);
    setWords(newWords);
    setActions(newActions);
    setStutters(newStutters);
    setExclamations(newExclamations);
    setLanguage(newLanguage);
  }

  function switchLanguage() {
    const switched =
      language === Language.ORG_TO_UWU
        ? Language.UWU_TO_ORG
        : Language.ORG_TO_UWU;

    updateValues([{ name: "language", value: switched }]);
  }

  return (
    <UwuifierContext.Provider
      value={{
        uwuifySentence,
        unuwuifySentence,
        translateSentence,
        resetValues,
        updateValues,
        switchLanguage,
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
