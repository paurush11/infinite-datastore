import { operationTypeKeys } from '@/lib/interfaces'
import { create } from 'zustand'

type State = {
    operation: operationTypeKeys
}
type Actions = {
    update: (operation: operationTypeKeys) => void
}
export const useOperationStore = create<State & Actions>((set) => ({
    operation: "Empty",
    update: (operation: operationTypeKeys) => set({ operation: operation })
}))
