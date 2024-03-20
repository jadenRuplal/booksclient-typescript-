import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'


interface componentInterface {
    handleSubmit: any,
    heading: string,
    categoryFilter: {
        name: string,
        category_type: {
            name: string,
            display_name: string
        }
    },
    handleCategoryUpdate: any
    
}



const FilterCategoryForm: React.FC<componentInterface> = (props) => {
    const { handleSubmit, heading, categoryFilter, handleCategoryUpdate } = props
    const result:any = useSelector((state) => state)
    const categoryOptions = result.option.value[0].options.data.category_type


     const checkStatusType = (object:any) => {
        return( object?.map((option:any) => (
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
                    placeholder="Enter Name"
                    value={categoryFilter.name}
                    onChange={(e) => handleCategoryUpdate(e.target.value, 'name')}
                />
                 <Form.Label htmlFor="type">Type</Form.Label>
                 <Select  options={checkStatusType(categoryOptions)}
                          onChange={(e:any) => handleCategoryUpdate(e.value, 'category_type')}
                          placeholder='Select Type'
                      />
                
                <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterCategoryForm