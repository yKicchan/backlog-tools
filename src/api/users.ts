import { useApi } from "./index";

export interface MySelf {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string
  mailAddress: string;
}

export const useGetUsersMyself = () => {
  return useApi("GET", "/users/myself");
};
