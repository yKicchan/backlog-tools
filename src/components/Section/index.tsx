import React from "react";
import styles from "./styles.module.css";

interface P {
  children: React.ReactNode
}

const Section: React.VFC<P> = ({ children }) => {
  return <section className={styles.component}>{children}</section>;
};

export default Section;
