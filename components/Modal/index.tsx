"use client";

import styles from "./Modal.module.scss";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { setValue } from "@/helper";
import { useRouter } from "next/navigation";
import { useUwuifier } from "@/context/UwuifierContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

import ModelTabs from "./Tabs";
import ModalGroupWords from "./Group/Words";
import ModalGroupSpaces from "./Group/Spaces";
import ModalGroupExclamations from "./Group/Exclamations";

export default function Modal() {
  const params = useSearchParams();
  const pathname = usePathname();

  const {
    faces,
    words,
    actions,
    stutters,
    exclamations,
    updateValue,
    uwuifySentence,
  } = useUwuifier();

  // prettier-ignore
  const [input, setInput] = useState(`Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.`);
  const [output, setOutput] = useState(uwuifySentence(input));
  const [active, setActive] = useState("spaces");

  const router = useRouter();
  const modal = params.get("modal");

  useEffect(() => {
    const body = document.querySelector("body");

    if (!body) {
      return;
    }

    body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  useEffect(() => {
    const output = uwuifySentence(input);

    setOutput(output);
  }, [uwuifySentence]);

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
              <ModalGroupWords words={words} onChange={updateValue} />
            )}

            {active === "exclamations" && (
              <ModalGroupExclamations
                exclamations={exclamations}
                onChange={updateValue}
              />
            )}

            {active === "spaces" && (
              <ModalGroupSpaces
                faces={faces}
                actions={actions}
                stutters={stutters}
                onChange={updateValue}
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
