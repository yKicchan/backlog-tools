import Section from "../Section";
import SectionTitle from "../SectionTitle";
import styles from "./styles.module.css";
import TextInput from "../TextInput";
import { useState } from "react";
import Button from "../Button";
import { useApi } from "../../api";
import { useSetConsole } from "../Console/atom";

const DeleteIssueAttachmentsForm = () => {
  const [issueIdOrKey, setIssueIdOrKey] = useState("");
  const setConsole = useSetConsole();
  const api = useApi();

  const getAttachments = async () => {
    const res = await api("GET", `/issues/${issueIdOrKey}/attachments`);
    if (!res) return;
    return (await res.json()) as Attachment[];
  };
  const deleteAllAttachments = async () => {
    const attachments = await getAttachments();
    if (!attachments || !attachments.length) {
      setConsole(
        `Notice: ${issueIdOrKey} に添付ファイルはありませんでした。🥺`
      );
      return;
    }
    let log: string[] = [`Notice: ${issueIdOrKey} ======= START =======`];
    for (const a of attachments) {
      const res = await api(
        "DELETE",
        `/issues/${issueIdOrKey}/attachments/${a.id}`
      );
      if (!res) {
        log.push(`Error: ${a.name} の削除に失敗しました...😭`);
        continue;
      }
      log.push(`Success: ${a.name} を削除しました。👋`);
    }
    log.push(`Notice: ${issueIdOrKey} =======  END  =======`);
    setConsole(log.join("\n"));
  };

  return (
    <Section>
      <SectionTitle num={2}>課題の添付ファイルを一括削除</SectionTitle>
      <div className={styles.inputs}>
        <TextInput
          value={issueIdOrKey}
          onChange={setIssueIdOrKey}
          placeholder="課題のID または 課題キー"
        />
        <Button onClick={deleteAllAttachments}>添付ファイルを一括削除</Button>
      </div>
    </Section>
  );
};

export default DeleteIssueAttachmentsForm;
