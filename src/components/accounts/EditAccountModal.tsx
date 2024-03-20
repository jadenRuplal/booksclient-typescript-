import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './EditAccountForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const EditAccountModal = (props:any) => {
    const {
        user, show, handleClose, account
    } = props
    const [typeUpdate, setTypeUpdate] = useState(props.account.account_type.name)
    const [nameUpdate, setNameUpdate] = useState(props.account.name)
    const dispatch = useDispatch()

    const handleChange = (e:{target:{ value:string }}) => {
        setNameUpdate(e.target.value)
    }
    const handleSelect = (data:{ value:string }) => {
        setTypeUpdate(data.value);
      }

    const editAccount = {
        name: nameUpdate,
        account_type: typeUpdate
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
      try {
        const response = await api.put(user, `account/${account.uuid}?with[]=account_type`, editAccount)
            handleClose()
            dispatch(
                setSnackbar(
                  true,
                  "success",
                  response.message.messages[0]
                )
              )
      } catch (error:any) {
        dispatch(
            setSnackbar(
              true,
              "error",
              error.response.data.message.messages
            )
          )
      }
    }


   

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <AccountForm
                    account={account}
                    nameUpdate={nameUpdate}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelect={handleSelect}
                    handleClose={handleClose}
                    heading="Update Account"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditAccountModal



