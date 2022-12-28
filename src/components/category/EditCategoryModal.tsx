import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CategoryForm from './CategoryForm'
import api from '../../api/payee'


const EditCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [category, setCategory] = useState(props.categpry)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setCategory((prevCategory: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name


            if (e.target.type === 'number') {
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
        e.preventDefault()
        api.put(user, `category/${category.uuid}?with[]=category_type`, category)
            .then(() => handleClose())
            .catch()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CategoryForm
                    category={category}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update category"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCategoryModal



