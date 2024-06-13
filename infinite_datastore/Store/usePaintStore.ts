import { create } from 'zustand'
import { defaultColor } from './useTextColorStore'
import { ColorResult } from 'react-color'

type State = {
    isClear: boolean
    color: ColorResult
    paintWidth: number
}
type Actions = {
    update: (color: ColorResult) => void
    setIsClear: () => void
    setPaintWidth: (width: number) => void
}

export const usePaintStore = create<State & Actions>((set) => ({
    isClear: false,
    color: defaultColor,
    paintWidth: 1,
    setIsClear: () => set((state) => ({ isClear: !state.isClear })),
    update: (color: ColorResult) => set({ color: color }),
    setPaintWidth: (width: number) => set({ paintWidth: width })
}))