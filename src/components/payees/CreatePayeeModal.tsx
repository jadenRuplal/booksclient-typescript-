import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'
import api from '../../api/payee'


const CreatePayeeModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [payee, setPayee] = useState(props.payee)

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



