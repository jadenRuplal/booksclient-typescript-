import React from 'react'
import {
    Form,
    Container
} from 'react-bootstrap'
import {Button} from '@material-ui/core'
import { useSelector } from 'react-redux'
import Select from 'react-select'


interface componentInterface {
    handleChange: any,
    handleSubmit: any,
    heading: string,
    accountFilter: any,
    setAccountFilter: any
    
}



const FilterTransactionForm: React.FC<componentInterface> = (props) => {
    const { handleSubmit, heading, accountFilter, setAccountFilter } = props
    const result:any = useSelector((state) => state)
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
                 <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterTransactionForm