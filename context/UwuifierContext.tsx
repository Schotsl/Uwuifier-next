"use client";

import Uwuifier from "uwuifier";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getValue, setValue } from "@/helper";
import { useRouter } from "next/navigation";

type UwuifierContextType = {
  uwuifySentence: (sentence: string) => string;
  updateValue: (name: string, value: number) => void;
  faces: number;
  words: number;
  actions: number;
  stutters: number;
  exclamations: number;
};

const UwuifierContext = createContext<UwuifierContextType>({
  uwuifySentence: (sentence: string) => sentence,
  updateValue: () => {},
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

  function uwuifySentence(sentence: string) {
    return uwuifier.uwuifySentence(sentence);
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

  return (
    <UwuifierContext.Provider
      value={{
        uwuifySentence,
        updateValue,
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
