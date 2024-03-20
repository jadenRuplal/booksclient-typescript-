import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'


interface componentInterface {
    handleChange: (e:any) => void,
    handleSubmit: (e:{preventDefault: () => void}) => void,
    heading: string
    
}

const PayeeForm: React.FC<componentInterface> = (props) => {
    const { handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PayeeForm