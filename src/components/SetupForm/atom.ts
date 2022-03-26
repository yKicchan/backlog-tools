import { atom } from "recoil";

export interface BacklogConfig {
  spaceKey: string;
  apiKey: string;
}

export const key = "setup.config" as const;

export const backlogConfig = atom<BacklogConfig>({
  key,
  default: {
    spaceKey: localStorage.getItem('spaceKey') ?? '',
    apiKey: localStorage.getItem('apiKey') ?? '',
  },
});
