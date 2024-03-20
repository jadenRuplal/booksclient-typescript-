import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'


interface componentInterface {
    handleSubmit: any,
    heading: string,
    payeeFilter: string
    
    handlePayeeUpdate: any
    
}



const FilterPayeeForm: React.FC<componentInterface> = (props) => {
    const { handleSubmit, heading, payeeFilter, handlePayeeUpdate } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Enter Name"
                    value={payeeFilter}
                    onChange={(e) => handlePayeeUpdate(e.target.value, 'name')}
                />
                <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterPayeeForm