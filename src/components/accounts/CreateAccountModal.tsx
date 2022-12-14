import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './AccountForm'
import api from '../../api/payee'


const CreateAccountModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [account, setAccount] = useState(props.account)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setAccount((prevAccount: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedAccount = {
                [updatedName]: updatedValue
            }
            return {
                ...prevAccount,
                ...updatedAccount
            }
        })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        // e equals the event
        e.preventDefault()
        api.post(user, 'account?with[]=account_type' ,account)
        handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <AccountForm
                    account={account}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Create account"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateAccountModal



