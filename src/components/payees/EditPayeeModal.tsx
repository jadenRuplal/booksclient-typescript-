import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'


const EditPayeeModal = (props:any) => {
    const {
        user, show, handleClose, msgAlert
    } = props
    const [payee, setPayee] = useState(props.payee)



    console.log('payee in edit', payee)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setPayee((prevPayee: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
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
        e.preventDefault()
        api.put(user, `payee/${payee.uuid}`, payee)
            .then(() => handleClose())
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



