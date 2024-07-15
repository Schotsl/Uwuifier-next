"use client";

import styles from "./Modal.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Uwuifier from "uwuifier";
import { getValue } from "@/helper";
import ModelTabs from "./Tabs";
import ModalGroupWords from "./Group/Words";
import ModalGroupExclamations from "./Group/Exclamations";
import ModalGroupSpaces from "./Group/Spaces";

export default function Modal() {
  const params = useSearchParams();
  const pathname = usePathname();

  const [active, setActive] = useState("words"); // 'words', 'exclamations', 'spaces
  const [output, setOutput] = useState("");

  const modal = params.get("modal");

  const [faces, setFaces] = useState(getValue(params, "faces", 0.5));
  const [actions, setActions] = useState(getValue(params, "actions", 0.075));
  const [stutters, setStutters] = useState(getValue(params, "stutters", 0.1));

  const [words, setWords] = useState(getValue(params, "words", 1));
  const [exclamations, setExclamations] = useState(
    getValue(params, "exclamations", 0.5)
  );

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

    const input =
      "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.";
    const ouput = uwuifier.uwuifySentence(input);

    setOutput(ouput);
  }, [words, faces, actions, stutters, exclamations]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = parseFloat(value);

    if (name === "faces") {
      const total = newValue + actions + stutters;
      if (total > 1) {
        const excess = total - 1;
        const actionsRatio = actions / (actions + stutters);
        const stuttersRatio = stutters / (actions + stutters);
        setActions(actions - excess * actionsRatio);
        setStutters(stutters - excess * stuttersRatio);
      }
      setFaces(newValue);
    } else if (name === "actions") {
      const total = faces + newValue + stutters;
      if (total > 1) {
        const excess = total - 1;
        const facesRatio = faces / (faces + stutters);
        const stuttersRatio = stutters / (faces + stutters);
        setFaces(faces - excess * facesRatio);
        setStutters(stutters - excess * stuttersRatio);
      }
      setActions(newValue);
    } else if (name === "stutters") {
      const total = faces + actions + newValue;
      if (total > 1) {
        const excess = total - 1;
        const facesRatio = faces / (faces + actions);
        const actionsRatio = actions / (faces + actions);
        setFaces(faces - excess * facesRatio);
        setActions(actions - excess * actionsRatio);
      }
      setStutters(newValue);
    } else {
      // For other inputs like 'words' and 'exclamations' that do not affect the 1 limit
      const setter = name === "words" ? setWords : setExclamations;
      setter(newValue);
    }
  };

  return (
    <>
      {modal && (
        <dialog className={styles.modal} open={modal !== null}>
          <form className={styles.modal__form} method="dialog">
            <ModelTabs active={active} onActive={setActive} />

            {active === "words" && (
              <ModalGroupWords words={words} handleChange={handleChange} />
            )}

            {active === "exclamations" && (
              <ModalGroupExclamations
                exclamations={exclamations}
                handleChange={handleChange}
              />
            )}

            {active === "spaces" && (
              <ModalGroupSpaces
                faces={faces}
                actions={actions}
                stutters={stutters}
                handleChange={handleChange}
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

            <Link
              href={pathname}
              scroll={false}
              style={{ position: "absolute", right: "2rem", top: "2rem" }}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{ fontSize: 24, color: "#fff" }}
              />
            </Link>
          </form>
        </dialog>
      )}
    </>
  );
}
