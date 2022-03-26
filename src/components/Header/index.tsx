import styles from "./styles.module.css";
import { ReactComponent as Logo } from "../../assets/images/backlog_logo.svg";

const Header = () => {
  return (
    <header className={styles.component}>
      <Logo className={styles.logo} />
    </header>
  );
};

export default Header;
