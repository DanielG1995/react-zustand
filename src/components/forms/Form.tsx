import { User } from "../../store"
import { useForm } from "../../hooks/useForm"
import { FC } from "react"

interface FormProps {
    currentUser: User | null
    onSubmit: (values: User) => void
}

const EMPTY_USER = {
    id: '',
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
}

const Form: FC<FormProps> = ({ currentUser, onSubmit }) => {

    const { values, handleChange } = useForm(currentUser ? { ...currentUser } : EMPTY_USER)


    const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        //TODO validaciones
        onSubmit(values)
    }

    return (
        <form className=" my-[40px] flex text-left flex-col gap-[10px]" onSubmit={onSubmitForm}>
            <label htmlFor="name">Nombre </label>
            <input required id="name" name="name" value={values?.name} onChange={handleChange} />
            <label htmlFor="email">Correo </label>
            <input required type="email" id="email" name="email" value={values?.email} onChange={handleChange} />
            <label htmlFor="gender">Genero </label>
            <select id="gender" className="grow" name="gender" value={values?.gender} onChange={handleChange} >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
            </select>
            <fieldset className="text-left flex justify-center">
                <legend className="mb-2 block text-sm font-medium">
                    Estado
                </legend>
                <div className="rounded-md  px-[14px] py-3">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="active"
                                name="status"
                                type="radio"
                                onChange={handleChange}
                                value='active'
                                aria-describedby="amount-status"
                                className="h-4 w-4  "
                                checked={values.status === 'active'}
                            />
                            <label
                                htmlFor="active"

                                className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Activo
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="inactive"
                                name="status"
                                type="radio"
                                aria-describedby="amount-status-paid"
                                onChange={handleChange}
                                className="h-4 w-4  "
                                value='inactive'
                                checked={values.status === 'inactive'}
                            />
                            <label
                                htmlFor="inactive"
                                className="ml-2 flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white "
                            >
                                Inactivo
                            </label>
                        </div>
                    </div>
                </div>

            </fieldset>
            <button className="border-white hover:bg-slate-200 hover:text-slate-800" type="submit">Guardar</button>
        </form>
    )
}

export default Form