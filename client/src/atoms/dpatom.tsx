import { atom } from "recoil";

export const dpatom = atom<{ file: File | null; imageUrl: string | null }>({
    key:"dpstate",
    default: { file: null, imageUrl: null }
})