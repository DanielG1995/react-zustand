import { FC, JSXElementConstructor, ReactElement, useLayoutEffect } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useUI } from "../store"

interface ModalProps {
    name: string
    title: string,
    isOpen?: boolean,
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>
}

const Modal: FC<ModalProps> = ({ name, title, isOpen = false, children = <></> }) => {

    const modals = useUI((state) => state.modals)
    const addModal = useUI((state) => state.loadModal)
    const openModal = useUI((state) => state.openModal)

    useLayoutEffect(() => {
        addModal({ name, isOpen })
    }, [addModal, isOpen, name])

    if (!modals.find(modal => modal.name === name)?.isOpen) {
        return <></>
    }

    return (
        <>
            <div className="absolute bg-slate-100 opacity-40  items-center w-screen h-full top-0 left-0" />
            <div className="fixed flex justify-center w-screen h-screen items-center top-0 left-0">
                <div className="relative min-w-[300px] min-h-[300px] bg-slate-950 p-[20px] rounded-3xl flex flex-col ">
                    <MdOutlineClose size='20px' className='absolute right-3 top-3 cursor-pointer' onClick={() => openModal(name)} />
                    <p className="bolder text-[30px]">
                        {title}
                    </p>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal