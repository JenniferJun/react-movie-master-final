import { atom } from "recoil";


export const searchkeyword = atom<string | null>({
  key: "keyword",
  default: "",
});
