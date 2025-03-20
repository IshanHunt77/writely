import { atom } from "recoil";

export const usernameatom = atom<{username:string|null}>({
    key:"username",
    default:{username:null}
})