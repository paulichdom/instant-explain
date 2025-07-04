import { mockExplain } from "@/mock/mockExplain";
import MainPanel from "@/components/MainPanel/MainPanel";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.panelWrapper}>
      <MainPanel explanation={mockExplain} />
    </div>
  );
}
