import ModelHeaderTabs from "./Tabs";

import styles from "./ModalHeader.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faRefresh } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/Icon";

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
          <Icon
            icon={faRefresh}
            aria="Reset values"
            onClick={resetValues}
            className={`${styles.header__menu__item} ${styles["header__menu__item--reset"]}`}
          />
        </li>

        <li className={styles.header__menu__item}>
          <Icon
            icon={faClose}
            aria="Close modal"
            onClick={handleClose}
            className={`${styles.header__menu__item} ${styles["header__menu__item--close"]}`}
          />
        </li>
      </menu>
    </nav>
  );
}
