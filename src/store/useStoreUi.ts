import { create } from 'zustand'


interface Modal {
    name: string
    isOpen: boolean
}

interface ModalState {
    modals: Modal[]
    loadModal: (modal: Modal) => void
    openModal: (id: string) => void
}



export const useUI = create<ModalState>()((set) => ({
    modals: [],
    loadModal: (modal: Modal) => set((state) => ({ modals: [...state.modals, modal] })),
    openModal: (name: string) => set((state) => ({
        modals: [...state.modals.map(modal => {
            if (name === modal.name) {
                return ({ ...modal, isOpen: !modal.isOpen })
            }
            return modal
        })]
    }))
}))