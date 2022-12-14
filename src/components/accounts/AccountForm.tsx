import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'


interface componentInterface {
    account: {
        last4: number,
        name: string
    },
    handleChange: any,
    handleSubmit: any,
    heading: string
    
}

const AccountForm: React.FC<componentInterface> = (props) => {
    const { account, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Change name here"
                    name="name"
                    id="name"
                    value={account.name}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default AccountForm