import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AccountForm from './AccountForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate, Navigate} from 'react-router'


const EditAccountModal = (props:any) => {
    const {
        user, show, handleClose,
         msgAlert, triggerRefresh
    } = props
    const navigate = useNavigate()
    const [account, setAccount] = useState(props.account)

    console.log('payee in edit modal', account)
    console.log('user in edit modal', user)

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
        api.put(user, `account/ee7dc0e12d281f811443a06852de4d5d?with[]=account_type`, account)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePayeeSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // .then(() => navigate('/myCars'))
            // if there is an error, tell the user about it
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



