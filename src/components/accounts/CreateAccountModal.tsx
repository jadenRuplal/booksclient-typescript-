import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './AccountForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate, Navigate} from 'react-router'


const CreateAccountModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [account, setAccount] = useState(props.account)

    console.log('payee in create modal', account)
    console.log('user in create modal', user)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setAccount((prevAccount: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            // console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
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
        console.log("this is user in update", user)
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



