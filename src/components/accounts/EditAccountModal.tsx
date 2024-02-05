import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './EditAccountForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const EditAccountModal = (props:any) => {
    const {
        user, show, handleClose, msgAlert
    } = props
    const [account, setAccount] = useState(props.account)
    const [typeUpdate, setTypeUpdate] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e:any) => {
        setNameUpdate(e.target.value)
    }
    const handleSelect = (data:any) => {
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



