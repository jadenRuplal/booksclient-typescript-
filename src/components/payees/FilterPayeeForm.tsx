import React, { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'


interface componentInterface {
    handleChange: any,
    handleSubmit: any,
    heading: string,
    payeeFilter: any,
    setPayeeFilter: any
    
}



const FilterTransactionForm: React.FC<componentInterface> = (props) => {
    const { handleChange, handleSubmit, heading, payeeFilter, setPayeeFilter } = props
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>(null)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user




    useEffect( () => {
       
      }, [])







    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Change name here"
                    name="name"
                    id="name"
                    value={payeeFilter.payee}
                    onChange={(e) => setPayeeFilter(e.target.value)}
                />
                <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterTransactionForm