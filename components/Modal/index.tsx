"use client";

import styles from "./Modal.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Uwuifier from "uwuifier";
import { getValue, setValue } from "@/helper";
import ModelTabs from "./Tabs";
import ModalGroupWords from "./Group/Words";
import ModalGroupExclamations from "./Group/Exclamations";
import ModalGroupSpaces from "./Group/Spaces";

export default function Modal() {
  const params = useSearchParams();
  const pathname = usePathname();

  const [output, setOutput] = useState("");
  const [active, setActive] = useState("spaces");

  const router = useRouter();
  const modal = params.get("modal");

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

  useEffect(() => {
    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

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

    const input = `Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.`;
    const output = uwuifier.uwuifySentence(input);

    setOutput(output);
  }, [words, faces, actions, stutters, exclamations]);

  const handleChange = (name: string, value: number) => {
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
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    if (target instanceof HTMLDialogElement) handleClose();
  };

  const handleClose = () => {
    const updated = setValue(params, "modal", undefined);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  };

  return (
    <>
      {modal && (
        <dialog
          open={modal !== null}
          onClick={handleClick}
          className={styles.modal}
        >
          <form className={styles.modal__form} method="dialog">
            <ModelTabs active={active} onActive={setActive} />

            {active === "words" && (
              <ModalGroupWords words={words} onChange={handleChange} />
            )}

            {active === "exclamations" && (
              <ModalGroupExclamations
                exclamations={exclamations}
                onChange={handleChange}
              />
            )}

            {active === "spaces" && (
              <ModalGroupSpaces
                faces={faces}
                actions={actions}
                stutters={stutters}
                onChange={handleChange}
              />
            )}

            <div className={styles.modal__form__group}>
              <label className={styles.modal__form__group__label}>
                Example
              </label>
              <textarea
                value={output}
                readOnly
                className={styles.modal__form__group__textarea}
              />
            </div>

            <button onClick={handleClose} className={styles.modal__form__close}>
              <FontAwesomeIcon
                icon={faClose}
                style={{ fontSize: 24, color: "#fff" }}
              />
            </button>
          </form>
        </dialog>
      )}
    </>
  );
}
