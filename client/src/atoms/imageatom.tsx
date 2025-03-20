import { atom } from "recoil";

export const imageatom = atom<{ file: File | null; imageUrl: string | null }>({
    key:"imagestate",
    default: { file: null, imageUrl: null }
})