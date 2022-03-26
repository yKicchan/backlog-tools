import React from "react";
import styles from "./styles.module.css";

interface P {
  children: React.ReactNode;
}

const TitleNumber: React.VFC<P> = ({ children }) => {
  return <span className={styles.component}>{children}</span>;
};

export default TitleNumber;
