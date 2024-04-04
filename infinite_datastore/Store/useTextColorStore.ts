import { ColorResult } from 'react-color'
import { create } from 'zustand'

type State = {
    color: ColorResult
}

type Actions = {
    update: (color: ColorResult) => void
}
export const defaultColor = {
    hex: '#000000',
    rgb: { r: 255, g: 255, b: 255, a: 1 },
    hsl: { h: 0, s: 0, l: 1, a: 1 }
}
export const useTextColorStore = create<State & Actions>((set) => ({
    color: defaultColor,
    update: (color: ColorResult) => set({ color: color })
}))
