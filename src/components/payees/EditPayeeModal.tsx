import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PayeeForm from './PayeeForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from "../../features/snackSlice"


const EditPayeeModal = (props:any) => {
    const {
        user, show, handleClose
    } = props
    const [payee, setPayee] = useState(props.payee)
    const dispatch = useDispatch()
    


 

    const handleChange = (e: { target: { value: string; name: any; type: string } } | any) => {
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



