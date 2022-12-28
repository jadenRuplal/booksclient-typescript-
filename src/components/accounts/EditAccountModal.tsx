import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './AccountForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'


const EditAccountModal = (props:any) => {
    const {
        user, show, handleClose, msgAlert
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
        e.preventDefault()
        api.put(user, `account/${account.uuid}?with[]=account_type`, account)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePayeeSuccess,
                    variant: 'success'
                })
            })
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePayeeFailure,
                    variant: 'danger'
                })
            )
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <AccountForm
                    account={account}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Account"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditAccountModal



