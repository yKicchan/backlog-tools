import Section from "../Section";
import SectionTitle from "../SectionTitle";
import styles from "./styles.module.css";
import TextInput from "../TextInput";
import { useState } from "react";
import Button from "../Button";
import { useApi } from "../../api";
import { useSetConsole } from "../Console/atom";

const DeleteIssuesAttachmentsForm = () => {
  const [issueIdOrKeyFor, setIssueIdOrKeyFor] = useState("");
  const [issueIdOrKeyTo, setIssueIdOrKeyTo] = useState("");
  const setConsole = useSetConsole();
  const api = useApi();

  const checkProjectKey = async () => {
    let splitedKeyFor = issueIdOrKeyFor.split('-');
    let splitedKeyTo = issueIdOrKeyTo.split('-');
    if (splitedKeyFor[0] !== splitedKeyTo[0]) {
      setConsole(
        `Notice: 2つの課題キーは同じプロジェクトではありません。😵`
      );
      return;
    }
    let deleteFunctions: Promise<string[]>[] = [];
    let log: string[] = [];
    for (let index = parseInt(splitedKeyFor[1]); index <= parseInt(splitedKeyTo[1]); index++) {
      deleteFunctions.push(deleteAllAttachments(splitedKeyFor[0] + '-' + index));
    }
    Promise.all(deleteFunctions).then((result) => {
      result.forEach((logs) => {
        log.push(...logs);
      });
      setConsole(log.join("\n"));
    });
  };
  const getAttachments = async (key: string) => {
    const res = await api("GET", `/issues/${key}/attachments`);
    if (!res) return;
    return (await res.json()) as Attachment[];
  };
  const deleteAllAttachments = async (key: string) => {
    const attachments = await getAttachments(key);
    if (!attachments || !attachments.length) {
      return [`Notice: ${key} に添付ファイルはありませんでした。🥺`];
    }
    let log: string[] = [`Notice: ${key} ======= START =======`];
    for (const a of attachments) {
      const res = await api(
        "DELETE",
        `/issues/${key}/attachments/${a.id}`
      );
      if (!res) {
        log.push(`Error: ${a.name} の削除に失敗しました...😭`);
        continue;
      }
      log.push(`Success: ${a.name} を削除しました。👋`);
    }
    log.push(`Notice: ${key} =======  END  =======`);
    return log;
  };

  return (
    <Section>
      <SectionTitle num={3}>複数の課題の添付ファイルを一括削除</SectionTitle>
      <div className={styles.inputs}>
        <TextInput
          value={issueIdOrKeyFor}
          onChange={setIssueIdOrKeyFor}
          placeholder="課題キー"
        />~
        <TextInput
          value={issueIdOrKeyTo}
          onChange={setIssueIdOrKeyTo}
          placeholder="課題キー"
        />
        <Button onClick={checkProjectKey}>添付ファイルを一括削除</Button>
      </div>
    </Section>
  );
};

export default DeleteIssuesAttachmentsForm;
