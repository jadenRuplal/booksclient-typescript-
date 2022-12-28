import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CategoryForm from './CategoryForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'

const CreateCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [category, setCategory] = useState(props.category)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setCategory((prevCategory: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedCategory = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCategory,
                ...updatedCategory
            }
        })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        // e equals the event
        e.preventDefault()
        api.post(user, 'category?&with[]=created_by&with[]=updated_by' ,category)
           handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CategoryForm
                    category={category}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Create Category"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateCategoryModal



