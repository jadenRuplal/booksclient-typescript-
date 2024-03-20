import React, { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import api from '../../api/payee'


interface componentInterface {
    handleChange: any,
    handleSubmit: any,
    handleAccountSelect: any,
    handlePayeeSelect: any,
    handleTypeSelect: any,
    handleStatusSelect: any,
    heading: string,
    transactionFilter: {
        transaction_date: any,
        payee: any,
        account: any,
        amount: any,
        transaction_type: any,
        transaction_status: any
    }
    
}



const FilterTransactionForm: React.FC<componentInterface> = (props) => {
    const { handleChange, handleSubmit, heading, transactionFilter, handleAccountSelect, handlePayeeSelect, handleStatusSelect, handleTypeSelect } = props
    const [accountSearch, setAccountSearch] = useState(null)
    const [account, setAccount] = useState<any>(null)
    const [payees, setPayees] = useState<any>(null)
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>(null)
    const result:any = useSelector((state) => state)
    const transactionTypes = result.option.value[0].options.data.transaction_type
    const transactionStatus = result.option.value[0].options.data.transaction_status
    const user = result.user.value[0].user


    const getAccountData = async () => {
        const response = await api.get(user, `account?filters[account.name]=${accountSearch}&with[]=account_type`)
            setAccount(response.data?.results)
       }

    const getPayeeData = async () => {
        const response = await api.get(user, `payee?filters[search]=${payeeSearch}&orderby=name&sortby=asc`)
      setPayees(response.data?.results)
      console.log('worked')
     }

     const payeeKeyDown = (e:any) => {
        return( 
         setPayeeSearch(e.target.value),
         setKeyDown('payee'))
        
     }
     
     const accountKeyDown = (e:any) => {
         setAccountSearch(e.target.value)
         setKeyDown('account') 
     }

     const checkStatusType = (object:any) => {
        return( object?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }
        
    const optionReturn = (object:any) => {
            return( object?.map((option:any) => (
               {value:`${option.uuid}`, label: `${option.name}`}
            )
        ))
            }
    


    useEffect( () => {
        const delayDebounce = setTimeout(()=> {
         
         if (keyDown === 'payee') {
         if (payeeSearch !== null) {
         getPayeeData()
         } else if (payeeSearch === '') {
             setPayees(null)
         }
     }

     if(keyDown === 'account') {
         if (accountSearch != null) {
             getAccountData()
         } else if (accountSearch === '') {
             setAccount(null)
         }
     }

        }, 1500)

        return () => clearTimeout(delayDebounce)
      }, [payeeSearch, accountSearch])







    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="date">Date</Form.Label>
                <Form.Control
                    type='date'
                    name="transaction_date"
                    id="date"
                    value={transactionFilter?.transaction_date}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="payee">Payee</Form.Label>
                 <Select  options={optionReturn(payees)}
                          onChange={handlePayeeSelect}
                          placeholder="Select Payee"
                          name='payee'
                          id='payee'
                          onKeyDown={(e:any) => payeeKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="account">Account</Form.Label>
                <Select  options={optionReturn(account)}
                          onChange={handleAccountSelect}
                          name='account'
                          placeholder='Select Account'
                          onKeyDown={(e:any) => accountKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="amount">Amount</Form.Label>
                <Form.Control
                        type='number'
                        name="amount"
                        id="amount"
                        placeholder='Enter Amount'
                        value={transactionFilter?.amount}
                        onChange={handleChange}
                    /> 
                 <Form.Label htmlFor="type">Type</Form.Label>
                 <Select  options={checkStatusType(transactionTypes)}
                          onChange={handleTypeSelect}
                          name='transaction_type'
                          placeholder='Select Type'
                      />
                <Form.Label htmlFor="status">Status</Form.Label>
                <Select  options={checkStatusType(transactionStatus)}
                          onChange={handleStatusSelect}
                          name='transaction_status'
                          placeholder='Select Status'
                         
                          
                      />
                <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterTransactionForm