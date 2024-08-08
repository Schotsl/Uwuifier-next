import styles from "./ModalTabs.module.scss";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

type ModelHeaderTabsProps = {
  active: string;
  onActive: (active: string) => void;
};

const tabs = [
  { label: "Spaces", value: "spaces" },
  { label: "Words", value: "words" },
  { label: "Exclamations", value: "exclamations" },
];

export default function ModelHeaderTabs({
  active,
  onActive,
}: ModelHeaderTabsProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (value: string) => {
    if (isMobile) {
      if (open && value === active) {
        setOpen(false);
      } else if (open && value !== active) {
        onActive(value);
        setOpen(false);
      } else if (!open) {
        setOpen(true);
      }

      return;
    }

    onActive(value);
  };

  const tabsCopy = [...tabs];
  const tabsSorted = isMobile
    ? tabsCopy.sort((a, b) =>
        a.value === active ? -1 : b.value === active ? 1 : 0,
      )
    : tabs;

  return (
    <menu
      className={
        open ? `${styles.tabs} ${styles["tabs--open"]}` : `${styles.tabs}`
      }
    >
      {tabsSorted.map((tab, index) => (
        <li
          key={tab.value}
          className={
            active === tab.value
              ? `${styles.tabs__tab} ${styles["tabs__tab--active"]}`
              : `${styles.tabs__tab}`
          }
        >
          <button
            className={styles.tabs__tab__button}
            onClick={() => handleClick(tab.value)}
          >
            {tab.label}

            {index === 0 && (
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                className={styles.tabs__tab__button__arrow}
              />
            )}
          </button>
        </li>
      ))}
    </menu>
  );
}
