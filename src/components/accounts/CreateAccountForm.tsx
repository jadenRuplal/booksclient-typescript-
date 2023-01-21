import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'


interface componentInterface {
    accountName: {
        last4: number,
        name: string
    } | string,
    handleChange: any,
    handleSubmit: any,
    handleSelect: any,
    heading: string,
    handleLast4: any
    
}

const AccountForm: React.FC<componentInterface> = (props) => {
    const { accountName, handleChange, handleSubmit, heading, handleSelect, handleLast4 } = props
    const result:any = useSelector((state) => state)
    const categoryOptions = result.option.value[0].options.data.account_type
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
                    placeholder="Add name here"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    required
                    
                />
                <Form.Label htmlFor="type">Account Type</Form.Label>
                <Select  options={optionType()}
                onChange={handleSelect}
                placeholder='Select Type'
                required
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default AccountForm