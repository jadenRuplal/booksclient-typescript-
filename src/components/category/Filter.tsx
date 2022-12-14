import React, { useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'


interface componentInterface {
    payees: [{
        uuid: string,
        name: string
    }],
    handleChange: any,
    handleSubmit: any,
   
    
}



const Filter: React.FC<componentInterface> = (props) => {
    const [search, setSearch ] = useState<any>('')
    const [payees, setPayees] = useState(props.payees)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setSearch((prevPayee: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedPayee = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPayee,
                ...updatedPayee
            }
        })
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
        const getPayees = async () => {
            const response = await api.get(user, `payee?filters[search]=${search.name}&orderby=name&sortby=asc`)
            setPayees(response.data?.results)
           }
           getPayees()
    }


    return (
        <Container className="justify-content-center">
            <h3>Filter</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Change name here"
                    name="name"
                    id="name"
                    value={search.name}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default Filter