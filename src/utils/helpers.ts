import { User } from "../store"

export const saveData = (data: User[]) => {
    console.log(data)
    localStorage.setItem('users', JSON.stringify(data))
}