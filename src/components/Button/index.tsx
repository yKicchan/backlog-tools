import React from "react";
import styles from "./styles.module.css";

interface P {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.VFC<P> = ({ children, onClick }) => {
  return (
    <button type="button" className={styles.component} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
