import { atom } from "recoil";

export const tagsatom = atom<{tags:string|null}>({
    key:"tagState",
    default:{tags:null}
})