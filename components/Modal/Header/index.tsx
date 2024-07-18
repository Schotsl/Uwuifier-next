import ModelHeaderTabs from "./Tabs";

import styles from "./ModalHeader.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faRefresh } from "@fortawesome/free-solid-svg-icons";

type ModalHeaderProps = {
  active: string;
  setActive: (active: string) => void;
  resetValues: () => void;
  handleClose: () => void;
};

export default function ModalHeader({
  active,
  setActive,
  resetValues,
  handleClose,
}: ModalHeaderProps) {
  return (
    <nav className={styles.header}>
      <ModelHeaderTabs active={active} onActive={setActive} />

      <menu className={styles.header__menu}>
        <li className={styles.header__menu__item}>
          <button
            onClick={resetValues}
            className={styles.header__menu__item__button}
          >
            <FontAwesomeIcon
              icon={faRefresh}
              style={{ fontSize: 20, color: "#fff" }}
            />
          </button>
        </li>

        <li className={styles.header__menu__item}>
          <button
            onClick={handleClose}
            className={styles.header__menu__item__button}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ fontSize: 24, color: "#fff" }}
            />
          </button>
        </li>
      </menu>
    </nav>
  );
}
