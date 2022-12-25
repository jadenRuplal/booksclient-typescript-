import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate, Navigate} from 'react-router'


const CreatePayeeModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [payee, setPayee] = useState(props.payee)

    console.log('payee in create modal', payee)
    console.log('user in create modal', user)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setPayee((prevPayee: any) => {
            let updatedValue:any = e.target.value
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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        // e equals the event
        e.preventDefault()
        console.log("this is user in update", user)
        api.post(user, 'payee?&with[]=created_by&with[]=updated_by' ,payee)
           handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PayeeForm
                    payee={payee}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Create Payee"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreatePayeeModal



