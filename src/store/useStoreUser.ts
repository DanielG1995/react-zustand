import { create } from 'zustand'
import { saveData } from '../utils/helpers'

export interface User {
    id: number | string,
    name: string,
    gender: string,
    email: string,
    status: string
}

interface UserState {
    users: User[]
    setUsers: (users: User[]) => void
    loadUser: (user: User) => void
    addUser: (user: User) => void
    updateUser: (id: string | number, user: User) => void
    deleteUser: (id: string | number) => void
    currentUser: null | User
}

export const useStoreUsers = create<UserState>()((set) => ({
    users: [],
    currentUser: null,
    addUser: (user: User) => set((state) => {
        const newArr = [...state.users, { ...user }]
        saveData(newArr)
        return ({ ...state, users: newArr })
    }),
    updateUser: (id: string | number, user: User) => set((state) => {
        const newArr = [...state.users.map(userItem => {
            if (userItem.id === id) {
                return {
                    ...user,
                    id
                }
            }
            return userItem
        })]
        saveData(newArr)
        return ({
            ...state, users: newArr
        })
    }),
    deleteUser: (id: string | number) => set((state) => {
        const newArr = [...state.users.filter(user => user.id !== id)]
        saveData(newArr)
        return ({ ...state, users: newArr })
    }),
    setUsers: (users) => set((state) => {
        saveData(users);
        return ({ ...state, users })
    }),
    loadUser: (user: User | null) => set((state) => ({ ...state, currentUser: user }))
}))
