import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'

import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate, Navigate} from 'react-router'


const EditPayeeModal = (props) => {
    const {
        user, show, handleClose,
        updatePayee, msgAlert, triggerRefresh
    } = props
    const navigate = useNavigate()
    const [payee, setPayee] = useState(props.payee)

    console.log('payee in edit modal', payee)
    console.log('user in edit modal', user)

    const handleChange = (e) => {
        setPayee(prevPayee => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            // console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedPayee = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPayee,
                ...updatedPayee
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        console.log("this is user in update", user)
        console.log("this is payee in update", payee)
        updatePayee(user, payee)
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
                <PayeeForm
                    payee={payee}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Payee"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPayeeModal



