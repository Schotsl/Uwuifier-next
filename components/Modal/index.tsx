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
              <div className={styles.modal__form__group}>
                <label className={styles.modal__form__group__label}>
                  Words
                </label>

                <p className={styles.modal__form__group__description}>
                  Controls the percentage of words transformed into uwu style.
                  At full setting (100%), all eligible words are uwuified, while
                  lower settings reduce this effect for subtler changes.
                </p>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  name="words"
                  value={words}
                  onChange={handleChange}
                  className={styles.modal__form__group__slider}
                />
              </div>
            )}

            {active === "exclamations" && (
              <div className={styles.modal__form__group}>
                <label className={styles.modal__form__group__label}>
                  Exclamations
                </label>
                <p className={styles.modal__form__group__description}>
                  Modifies how often standard exclamations are replaced with
                  more expressive alternatives from the Uwuifier&apos;s array. A
                  higher setting leads to more varied and expressive
                  exclamations.
                </p>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  name="exclamations"
                  value={exclamations}
                  onChange={handleChange}
                  className={styles.modal__form__group__slider}
                />
              </div>
            )}

            {active === "spaces" && (
              <div className={styles.modal__form__group}>
                <label className={styles.modal__form__group__label}>
                  Faces
                </label>
                <p className={styles.modal__form__group__description}>
                  Adjusts how frequently cute emoticon faces, like UwU, appear
                  in the text. Increase the slider for more frequent faces,
                  adding a playful touch.
                </p>

                <input
                  type="range"
                  min="0"
                  max="1"
                  name="faces"
                  step="0.01"
                  value={faces}
                  onChange={handleChange}
                  className={styles.modal__form__group__slider}
                />

                <label className={styles.modal__form__group__label}>
                  Actions
                </label>
                <p className={styles.modal__form__group__description}>
                  Determines the likelihood of inserting playful actions, such
                  as notices buldge, into the text. Higher settings result in
                  more actions, enhancing the whimsical aspect.
                </p>

                <input
                  type="range"
                  min="0"
                  max="1"
                  name="actions"
                  step="0.01"
                  value={actions}
                  onChange={handleChange}
                  className={styles.modal__form__group__slider}
                />

                <label className={styles.modal__form__group__label}>
                  Stutters
                </label>
                <p className={styles.modal__form__group__description}>
                  Sets the rate at which words start with stutters, like
                  s-s-stutter. Moving the slider up increases the frequency of
                  stutters, emphasizing the characteristic uwu speech pattern.
                </p>

                <input
                  type="range"
                  min="0"
                  max="1"
                  name="stutters"
                  step="0.01"
                  value={stutters}
                  onChange={handleChange}
                  className={styles.modal__form__group__slider}
                />
              </div>
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
