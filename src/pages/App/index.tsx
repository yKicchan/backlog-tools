import Header from "../../components/Header";
import styles from "./styles.module.css";
import { RecoilRoot } from "recoil";
import SetupForm from "../../components/SetupForm";
import Console from "../../components/Console";
import DeleteIssueAttachmentsForm from "../../components/DeleteIssueAttachmentsForm";
import DeleteIssuesAttachmentsForm from "../../components/DeleteIssuesAttachmentsForm";

function App() {
  return (
    <RecoilRoot>
      <div className={styles.app}>
        <Header />
        <SetupForm />
        <DeleteIssueAttachmentsForm />
        <DeleteIssuesAttachmentsForm />
        <footer className={styles.footer}>
          <Console />
        </footer>
      </div>
    </RecoilRoot>
  );
}

export default App;
