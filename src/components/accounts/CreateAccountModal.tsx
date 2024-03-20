import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreateAccountForm from './CreateAccountForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const CreateAccountModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [accountName, setAccountName] = useState('')
    const [accountType, setAccountType] = useState('')
    const [accountLast4, setAccountLast4] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setAccountName(e.target.value)
    }

    const createAccount = {
        name: accountName,
        account_type: accountType
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
      try {
        const response = await api.post(user, 'account?with[]=account_type', createAccount)
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

    function handleSelect(data: {value: string}) {
        setAccountType(data.value)
      }
      function handleLast4(e:any) {
        setAccountLast4(e.target.value)
      }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CreateAccountForm
                    accountName={accountName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelect={handleSelect}
                    heading="Create account"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateAccountModal



