import styles from "./styles.module.css";
import React from "react";

interface P {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const TextInput: React.VFC<P> = (props) => {
  return (
    <input
      type="text"
      className={styles.component}
      value={props.value}
      onFocus={event => event.target.select()}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
};

export default TextInput;
