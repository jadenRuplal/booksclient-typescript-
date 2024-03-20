import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'


interface componentInterface {
    category: {
        category_type: any,
        uuid: string,
        name: string
    },
    categoryUpdate:string,
    handleChange: any,
    handleSubmit: any,
    heading: string,
    createCategoryName: any,
    handleSelect: any,
    selectedOptions: any
    
    
}

const CategoryForm: React.FC<componentInterface> = (props) => {
    const {  handleChange, handleSubmit, heading, createCategoryName, handleSelect} = props
    const result:any = useSelector((state) => state)
    const categoryOptions = result.option.value[0].options.data.category_type
    const optionType = () => {
        return( categoryOptions?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder='Enter Name'
                    name="name"
                    id="name"
                    value={createCategoryName}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Select  options={optionType()}
                onChange={handleSelect}
                placeholder='Select Type'
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CategoryForm