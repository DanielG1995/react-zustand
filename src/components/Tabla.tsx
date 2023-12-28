import { FC } from "react"
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { User, useStoreUsers, useUI } from "../store";
import '../App.css'

interface TableRow {
    id: string | number
    [key: string]: string | number | boolean | null;
}


interface TablaProps {
    headers: string[];
    rows: TableRow[];
    keys: string[];
}




const Tabla: FC<TablaProps> = ({ headers, rows, keys }) => {

    const loadUser = useStoreUsers((state) => state.loadUser)
    const deleteUser = useStoreUsers((state) => state.deleteUser)
    const openModal = useUI((state) => state.openModal)

    return (
        <table className=" ">
            <tbody>
                <tr className="border-b-2 text-[20px] bolder white text-center">
                    {
                        headers?.map(title => (<th key={title}>{title}</th>))
                    }

                </tr>
                {
                    rows?.map((row) => (<tr className=" border-b text-left border-b-white" key={row.id + 'tr'}>
                        {

                            keys.map(key => (<td className="p-[20px]" key={row?.[key] + 'td'}>{row?.[key]}</td>))


                        }
                        <td className="flex p-[20px] flex-row gap-[10px] items-center">
                            <MdOutlineEdit size={'30px'} className='cursor-pointer' onClick={() => { loadUser(row as unknown as User); openModal('modalEditar') }} />
                            <MdOutlineDelete size={'30px'} className='cursor-pointer' onClick={() => deleteUser(row.id)} />
                        </td>
                    </tr>))
                }
            </tbody>
        </table>
    )
}

export default Tabla