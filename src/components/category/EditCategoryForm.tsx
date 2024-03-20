
import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { deletePayee } from '../../api/payee'


interface componentInterface {
    category: {
        category_type: any,
        uuid: string,
        name: string
    },
    categoryEdit: {
        name: string,
        category_type: {
            name: string,
            display_name: string
        }
    },
    handleSubmit: any,
    heading: string,
    handleSelect: any,
    selectedOptions: any,
    handleClose: any,
    updateCategory: any
    
    
}

const EditCategoryForm: React.FC<componentInterface> = (props) => {
    const { handleSubmit, heading, handleSelect, category, handleClose, updateCategory, categoryEdit} = props
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
             handleClose()
        }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder={category.name}
                    value={categoryEdit.name}
                    onChange={(e) => updateCategory(e, 'name')}
                    required
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Select  options={optionType()}
                onChange={(e) => handleSelect(e, 'category_type')}
                defaultInputValue={categoryEdit.category_type.name}
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