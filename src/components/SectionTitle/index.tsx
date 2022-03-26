import React from "react";
import TitleNumber from "../TitleNumber";
import styles from "./styles.module.css";

interface P {
  num?: number;
  children: React.ReactNode;
}

const SectionTitle: React.VFC<P> = ({ children, num }) => {
  return (
    <h2 className={styles.component}>
      <TitleNumber>{num}</TitleNumber>
      <span className={styles.title}>{children}</span>
    </h2>
  );
};

export default SectionTitle;
