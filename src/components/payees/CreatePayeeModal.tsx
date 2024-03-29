import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreatePayeeForm from './CreatePayeeForm'
import api from '../../api/payee'
import { setSnackbar } from '../../features/snackSlice'
import { useDispatch } from 'react-redux'




interface componentInterface {
  
}

const CreatePayeeModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [payeeName, setPayeeName] = useState(null)
    const dispatch = useDispatch()


    const handleChange = (e:any) => {
        setPayeeName((prevPayee: any) => {
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
       const response = await api.post(user, 'payee?&with[]=created_by&with[]=updated_by' ,payeeName)
           handleClose()
           dispatch(
            setSnackbar(
              true,
              "success",
              response.message.messages[0]
            )
          )
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
                <CreatePayeeForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Create Payee"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreatePayeeModal



