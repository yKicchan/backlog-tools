import styles from "./styles.module.css";
import { useRecoilState } from "recoil";
import { BacklogConfig, backlogConfig } from "./atom";
import TextInput from "../TextInput";
import Section from "../Section";
import SectionTitle from "../SectionTitle";
import Button from "../Button";
import {MySelf, useGetUsersMyself} from "../../api/users";
import { useSetConsole } from "../Console/atom";

const SetupForm = () => {
  const [config, setConfig] = useRecoilState(backlogConfig);
  const setConsole = useSetConsole();
  const getUsersMyself = useGetUsersMyself();

  const onChange = (key: keyof BacklogConfig) => (value: string) => {
    localStorage.setItem(key, value);
    return setConfig({
      ...config,
      [key]: value,
    });
  };

  const ping = async () => {
    getUsersMyself().then(async res => {
      const mySelf = await res.json() as MySelf;
      setConsole(`Success: ようこそ！ ${mySelf.name} さん🤗`);
    }).catch(reason => {
      setConsole(reason);
    });
  };

  return (
    <Section>
      <SectionTitle num={1}>接続に必要な情報を入力</SectionTitle>
      <div className={styles.inputs}>
        <TextInput
          value={config.spaceKey}
          onChange={onChange("spaceKey")}
          placeholder="スペースキー"
        />
        <TextInput
          value={config.apiKey}
          onChange={onChange("apiKey")}
          placeholder="API キー"
        />
        <Button onClick={ping}>ping</Button>
      </div>
    </Section>
  );
};

export default SetupForm;
