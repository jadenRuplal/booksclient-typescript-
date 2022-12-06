import {
    Form,
    Button,
    Container
} from 'react-bootstrap'


interface componentInterface {
    payee: {
        uuid: string,
        name: string
    },
    handleChange: () => void,
    handleSubmit: () => void,
    heading: string
    
}

const PayeeForm: React.FC<componentInterface> = (props) => {
    const { payee, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Change name here"
                    name="name"
                    id="name"
                    value={payee.name}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PayeeForm