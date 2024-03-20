import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { deletePayee } from '../../api/payee'


interface componentInterface {
    payee: {
        uuid: string,
        name: string
    },
    handleChange: (e:{ preventDefault: () => void }) => void,
    handleSubmit: (e:{ preventDefault: () => void }) => void,
    heading: string,
    handleClose: () => void
}

const PayeeForm: React.FC<componentInterface> = (props) => {
    const { payee, handleChange, handleSubmit, heading, handleClose } = props
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user

    const deleteThePayee = () => {
        deletePayee(user, `payee/${payee?.uuid}`)
        handleClose()
    }

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
                <Button onClick={() => deleteThePayee()}
                        className="m-2"
                        variant="warning">Delete Category
                </Button>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PayeeForm