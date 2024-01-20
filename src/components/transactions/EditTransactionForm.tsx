import  Select  from 'react-select'
import React, { useEffect, useRef, useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import api, { deletePayee } from '../../api/payee'
import { useSelector } from 'react-redux'


interface componentInterface {
    transaction: {
        transaction_date: any
        transaction_type: any
        transaction_status: any
        payee: any
        description: string | number 
        uuid: string
        name: string
        category: {
            name: string
        }
        account: {
            name: string
        }
    },
    handleChange: any,
    handleSubmit: any,
    handlePayeeSelect: any,
    handleCategorySelect: any,
    heading: string,
    transactionUpdate: any,
    handleClose: any,
    handleTypeSelect: any,
    handleAccountSelect: any,
    handleStatusSelect: any
}

const EditTransactionForm: React.FC<componentInterface> = (props) => {
    const { transaction, handleChange, handleClose, handleSubmit, heading, handlePayeeSelect, handleCategorySelect, transactionUpdate, handleTypeSelect, handleAccountSelect, handleStatusSelect } = props
    const [account, setAccount] = useState<any>(null)
    const [payees, setPayees] = useState<any>(null)
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>(null)
    const [accountSearch, setAccountSearch] = useState(null)
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
    
const getPayee = (e:any) => {
    setPayeeSearch(e.target.value)
    setTimeout(getPayeeData, 1500)
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
const transactionType = () => {
    return( transactionTypes?.map((option:any) => (
       {value:`${option.name}`, label: `${option.display_name}`}
    )
))
    }

    const transactionStat = () => {
        return( transactionStatus?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }

    const payeeOptionType = () => {
        return( payees?.map((option:any) => (
           {value:`${option.uuid}`, label: `${option.name}`}
        )
    ))
        }
        
    const accountOptionType = () => {
            return( account?.map((option:any) => (
               {value:`${option.uuid}`, label: `${option.name}`}
            )
        ))
            }

    const deleteTheTransaction = () => {
            deletePayee(user, `transaction/${transaction?.uuid}`)
             handleClose()
            }

        useEffect( () => {
           const delayDebounceFn = setTimeout(()=> {
            
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

           return () => clearTimeout(delayDebounceFn)
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
                    value={transactionUpdate?.transaction_date}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="payee">Payee</Form.Label>
                 <Select  options={payeeOptionType()}
                          onChange={handlePayeeSelect}
                          defaultInputValue={transaction?.payee?.name}
                          value={transactionUpdate.payee}
                          name='payee'
                          id='payee'
                          onKeyDown={(e:any) => payeeKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="category">Account</Form.Label>
                <Select  options={accountOptionType()}
                          onChange={handleAccountSelect}
                          defaultInputValue={transaction?.account?.name}
                          placeholder='Select Category'
                          onKeyDown={(e:any) => accountKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="amount">Amount</Form.Label>
                <Form.Control
                        type='number'
                        name="amount"
                        id="amount"
                        value={transactionUpdate?.amount}
                        onChange={handleChange}
                    /> 
                 <Form.Label htmlFor="type">Type</Form.Label>
                 <Select  options={transactionType()}
                          onChange={handleTypeSelect}
                          defaultInputValue={transaction?.transaction_type?.display_name}
                          placeholder={transactionUpdate.transaction_type}
                      />
                <Form.Label htmlFor="status">Status</Form.Label>
                <Select  options={transactionStat()}
                          onChange={handleStatusSelect}
                          defaultInputValue={transaction?.transaction_status?.display_name}
                          placeholder={transactionUpdate.transaction_status}
                         
                          
                      />
                <Button type="submit">Submit</Button>
                <Button onClick={() => deleteTheTransaction()}
                        className="m-2"
                        variant="warning">Delete Map
                </Button>
            </Form>
        </Container>
    )
}

export default EditTransactionForm