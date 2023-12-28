import { useState } from "react"
import { User } from "../store"

export const useForm = (defaultValues: User) => {

    const [values, setValues] = useState<User>({ ...defaultValues })

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(prev => ({ ...prev, [evt.target.name]: evt.target.value }))
    }


    return { values, setValues, handleChange }

}