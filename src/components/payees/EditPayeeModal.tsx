import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'
import { useDispatch } from 'react-redux'
import { setSnackbar } from "../../features/snackSlice"


const EditPayeeModal = (props:any) => {
    const {
        user, show, handleClose, msgAlert, perPage, pageSelect, search
    } = props
    const [payee, setPayee] = useState(props.payee)
    const [payees, setPayees] = useState(props.payees)
    const dispatch = useDispatch()
    const getPayees = async () => {
        const response = await api.get(user, `payee?filters[search]=${search}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}`)  
       setPayees(response.data?.results)
       }


 

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

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
       
       try {
        const response = await api.put(user, `payee/${payee.uuid}`, payee)
                dispatch(
                    setSnackbar(
                      true,
                      "success",
                      response.message.messages[0]
                    )
                  )
                handleClose()
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
                <PayeeForm
                    payee={payee}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                    heading="Update Payee"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPayeeModal



