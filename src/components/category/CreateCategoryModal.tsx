import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CategoryForm from './CategoryForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'

const CreateCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [createCategoryName, setCreateCategory] = useState<any>('')
    const [selectedOptions, setSelectedOptions] = useState<any>('')
    const dispatch = useDispatch()

const createObject = {
    name: `${createCategoryName}`,
    category_type: `${selectedOptions.label}`
}

    function handleSelect(data:any) {
        setSelectedOptions(data);
      }
    const handleChange = (e: { target: { value: string; } }) => {
        setCreateCategory(e.target.value)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
           const response = await api.post(user, 'category?&with[]=created_by&with[]=updated_by' ,createObject)
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
                <CategoryForm
                    createCategoryName={createCategoryName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelect={handleSelect}
                    heading="Create Category" category={{
                        category_type: undefined,
                        uuid: '',
                        name: ''
                    }} selectedOptions={''} categoryUpdate={''}               />
            </Modal.Body>
        </Modal>
    )
}

export default CreateCategoryModal



