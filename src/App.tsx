import { useCallback, useEffect } from 'react'
import Tabla from './components/Tabla'
import Modal from './components/Modal'
import { HEADERS, KEYS } from './utils'
import { User, useStoreUsers, useUI } from './store'
import './App.css'
import Form from './components/forms/Form'
import { uid } from 'uid'


function App() {

  const users = useStoreUsers((state) => state.users)
  const currentUser = useStoreUsers((state) => state.currentUser)
  const setUsers = useStoreUsers((state) => state.setUsers)
  const addUser = useStoreUsers((state) => state.addUser)
  const updateUser = useStoreUsers((state) => state.updateUser)
  const openModal = useUI((state) => state.openModal)

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await fetch('https://gorest.co.in/public/v2/users');
      const parsedData = await response?.json()
      setUsers(parsedData)
    } catch (error) { /* empty */ }
  }, [setUsers])

  useEffect(() => {
    const data = localStorage.getItem('users')
    if (data) {
      setUsers(JSON.parse(data))
    } else {
      fetchUsuarios()
    }
  }, [fetchUsuarios, setUsers])

  const onSubmitCreate = (values: User) => {
    addUser({ ...values, id: uid() })
    openModal('modalCrear')
  }

  const onSubmitUpdate = (values: User) => {
    values.id && updateUser(values.id, values)
    openModal('modalEditar')
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-4 justify-end pb-5'>
        <button onClick={() => openModal('modalCrear')} className='self-end '>Crear</button>
        <button onClick={() => fetchUsuarios()}>Precargar usuarios</button>
      </div>
      <Tabla keys={KEYS} headers={HEADERS} rows={users.map(user => ({ ...user }))} />
      <Modal name={'modalCrear'} title='Crear' >
        <Form currentUser={null} onSubmit={onSubmitCreate} />
      </Modal>
      <Modal name={'modalEditar'} title='Editar' >
        <Form currentUser={currentUser} onSubmit={onSubmitUpdate} />
      </Modal>
    </div >
  )
}

export default App
