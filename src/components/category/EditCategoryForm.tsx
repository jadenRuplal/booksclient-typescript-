
import React, { useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select, { SelectInstance } from 'react-select'
import { deletePayee } from '../../api/payee'


interface componentInterface {
    category: {
        category_type: any,
        uuid: string,
        name: string
    },
    categoryUpdate:any,
    handleChange: any,
    handleSubmit: any,
    heading: string,
    createCategoryName: any,
    handleSelect: any,
    selectedOptions: any,
    typeUpdate: any,
    handleClose: any
    
    
}

const EditCategoryForm: React.FC<componentInterface> = (props) => {
    const {  handleChange, handleSubmit, heading, categoryUpdate, handleSelect, category, typeUpdate, handleClose} = props
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const categoryOptions = result.option.value[0].options.data.category_type
    const optionType = () => {
        return( categoryOptions?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }
        const deleteTheCategory = () => {
            deletePayee(user, `category/${category?.uuid}`)
                .then(() => handleClose())
        }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder={category.name}
                    value={categoryUpdate}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Select  options={optionType()}
                onChange={handleSelect}
                placeholder='Select Type'
                />
                <Button onClick={() => deleteTheCategory()}
                                    className="m-2"
                                    variant="warning">Delete Category</Button>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default EditCategoryForm