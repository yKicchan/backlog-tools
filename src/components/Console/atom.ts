import { atom, useRecoilState } from "recoil";

const key = "console.log" as const;

export const console = atom<string>({
  key,
  default: "ここに実行ログが表示されます",
});

export const useSetConsole = () => {
  const [log, setValue] = useRecoilState(console);
  return (value: string) => setValue(log + "\n" + value);
};
