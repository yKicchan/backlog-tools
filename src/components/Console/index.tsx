import styles from "./styles.module.css";
import { useRecoilValue } from "recoil";
import { console } from "./atom";
import { useEffect } from "react";

const Console = () => {
  const log = useRecoilValue(console);
  useEffect(() => {
    const target = document.getElementById("console");
    if (!target) return;
    target.scrollTop = target.scrollHeight;
  });
  return (
    <pre id="console" className={styles.component}>
      <div className={styles.lines}>
        {log.split("\n").map((v, i) => (
          <span key={i + v} className={styles.numbers}>
            {i + 1}
          </span>
        ))}
      </div>
      {log}
    </pre>
  );
};

export default Console;
