import { create } from 'zustand'

type State = {
    isClear: boolean
   
} 
type Actions = {
    setIsClear: () => void
}

export const usePaintStore = create<State & Actions>((set)=>({
    isClear: false,
    setIsClear: () => set((state)=>({isClear: !state.isClear }))
}))