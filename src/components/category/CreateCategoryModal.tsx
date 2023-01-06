import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CategoryForm from './CategoryForm'
import api from '../../api/payee'

const CreateCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [createCategoryName, setCreateCategory] = useState<any>('')
    const [selectedOptions, setSelectedOptions] = useState<any>('')

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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        // e equals the event
        e.preventDefault()
        api.post(user, 'category?&with[]=created_by&with[]=updated_by' ,createObject)
           handleClose()
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



