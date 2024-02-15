import React, { useEffect, useState } from 'react'
import {
    Form,
    Container
} from 'react-bootstrap'
import {Button} from '@material-ui/core'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import api from '../../api/payee'


interface componentInterface {
    handleChange: any,
    handleSubmit: any,
    heading: string,
    accountFilter: any,
    setAccountFilter: any
    
}



const FilterTransactionForm: React.FC<componentInterface> = (props) => {
    const { handleChange, handleSubmit, heading, accountFilter, setAccountFilter } = props
    const [keyDown, setKeyDown] = useState('')
    const [accountSearch, setAccountSearch] = useState<any>(null)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const accountOptions = result.option.value[0].options.data.account_type




      function handleAccountSelect(data:any, name:any) {
        setAccountFilter({...accountFilter, [name]: data.value})
        console.log(accountFilter)
      }

      const optionReturn = (object:any) => {
        return( object?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }



    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Account Type</Form.Label>
                <Select  options={optionReturn(accountOptions)}
                          onChange={(value) => handleAccountSelect(value, 'account_type')}
                          placeholder="Select Account Type"
                          name='account_type'
                          required
                          id='account_type'
                      />
                <Form.Label >Name</Form.Label>
                <Form.Control
                        type='input'
                        placeholder='Enter Name'
                        onChange={(data) => handleAccountSelect(data.target, 'name')}
                    /> 
                <Form.Label>Last4</Form.Label>
                <Form.Control
                        type='number'
                        min='1000'
                        max='9999'
                        placeholder='Enter Last4'
                        onChange={(value) => handleAccountSelect(value.target, 'last4')}
                    /> 
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterTransactionForm