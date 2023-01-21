import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditCategoryForm from './EditCategoryForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const EditCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [category, setCategory] = useState(props.category)
    const [typeUpdate, setTypeUpdate] = useState(null)
    const [categoryUpdate, setCategoryUpdate] = useState<any>('')
    const dispatch = useDispatch()

const updateObject = {
    name: categoryUpdate,
    category_type: typeUpdate
}

    function handleSelect(data:any) {
        setTypeUpdate(data.value);
      }

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setCategoryUpdate(e.target.value)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
        const response = await api.put(user, `category/${category.uuid}?with[]=category_type&with[]=parent_category`, updateObject)
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
                <EditCategoryForm
                    category={category}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                    heading="Update category" categoryUpdate={categoryUpdate} createCategoryName={undefined} handleSelect={handleSelect} selectedOptions={''} typeUpdate={undefined}                                  />
            </Modal.Body>
        </Modal>
    )
}

export default EditCategoryModal


