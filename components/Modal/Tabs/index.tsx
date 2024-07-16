import styles from "./ModalTabs.module.scss";

type ModelTabsProps = {
  active: string;
  onActive: (active: string) => void;
};

const tabs = [
  { label: "Spaces", value: "spaces" },
  { label: "Words", value: "words" },
  { label: "Exclamations", value: "exclamations" },
];

export default function ModelTabs({ active, onActive }: ModelTabsProps) {
  return (
    <ul className={styles.tabs}>
      {tabs.map((tab) => (
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
            onClick={() => onActive(tab.value)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
