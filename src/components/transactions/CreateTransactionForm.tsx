import React, { useEffect, useState } from 'react'
import {
    Form,
    Container
} from 'react-bootstrap'
import {Button} from '@material-ui/core'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import api from '../../api/payee'
import DeleteIcon from '@mui/icons-material/Delete'
import './modal.css'



interface componentInterface {
    handleChange: any,
    add: any,
    handleSubmit: any,
    handleAccountSelect: any,
    handlePayeeSelect: any,
    handleTypeSelect: any,
    handleStatusSelect: any,
    handleCategorySelect: any,
    details:any,
    setDetails:any,
    setValue:any,
    heading: string,
    transactionCreate: {
        transaction_date: any,
        payee: string,
        account: string,
        amount: number,
        transaction_type: any,
        transaction_status: any,
        descriptionAmount: number
    }
    
    
}



const TransactionForm: React.FC<componentInterface> = (props:any) => {
    const { handleChange, handleSubmit, heading, transactionCreate, handleAccountSelect, handlePayeeSelect, handleStatusSelect, handleTypeSelect, details, add, handleCategorySelect } = props
    const [accountSearch, setAccountSearch] = useState(null)
    const [account, setAccount] = useState<any>(null)
    const [category, setCategory] = useState<any>(null)
    const [payees, setPayees] = useState<any>(null)
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>(null)
    const [categorySearch, setCategorySearch] = useState<any>(null)
    const [counter, setCounter] = useState<number>(0)
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
     }

    const getCategoryData = async () => {
        const response = await api.get(user, `category?filters[search]=${categorySearch}&orderby=name&sortby=asc`)
      setCategory(response.data?.results)
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

     const categoryKeyDown = (e:any) => {
        setCategorySearch(e.target.value)
        setKeyDown('category') 
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



        const setDescriptionValue = (e:any, detail:any) => {
                const index = details.indexOf(detail)
                details[index].description = e.target.value
             }

             const setAmountValue = (e:any, detail:any) => {
                const index = details.indexOf(detail)
                details[index].amount = e.target.value
                console.log(details)
             }

             const setCategoryValue = (data:any, detail:any) => {
                const index = details.indexOf(detail)
                details[index].category = data.value
                console.log(details)
             }

         const deleteDetail = (e:any, detail:{}) => {
            const index = details.indexOf(detail)
            delete details[index]
            setCounter(counter + 1)
            console.log(details)
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

     if(keyDown === 'category') {
        if (categorySearch != null) {
            getCategoryData()
        } else if (categorySearch === '') {
            setCategory(null)
        }
    }

        }, 1500)

        return () => clearTimeout(delayDebounceFn)
      }, [payeeSearch, accountSearch, categorySearch])





    return (
        <>
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <>
                <Form.Label htmlFor="date">Date</Form.Label>
                <Form.Control
                    type='date'
                    required
                    name="transaction_date"
                    id="date"
                    value={transactionCreate?.transaction_date}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="payee">Payee</Form.Label>
                 <Select  options={optionReturn(payees)}
                          onChange={handlePayeeSelect}
                          placeholder="Select Payee"
                          name='payee'
                          required
                          id='payee'
                          onKeyDown={(e:any) => payeeKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="account">Account</Form.Label>
                <Select  options={optionReturn(account)}
                          onChange={handleAccountSelect}
                          name='account'
                          placeholder='Select Account'
                          required
                          onKeyDown={(e:any) => accountKeyDown(e)}
                          
                      />
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                <Form.Label htmlFor="amount">Amount</Form.Label>
                <Form.Control
                        type='number'
                        required
                        name="amount"
                        id="amount"
                        placeholder='Enter Amount'
                        value={transactionCreate?.amount}
                        onChange={handleChange}
                    /> 
                    </div>
                    <div>
                 <Form.Label htmlFor="type">Type</Form.Label>
                 <Select  options={checkStatusType(transactionTypes)}
                          onChange={handleTypeSelect}
                          name='transaction_type'
                          placeholder='Select Type'
                      />
                      </div>
                    <div>
                <Form.Label htmlFor="status">Status</Form.Label>
                <Select  options={checkStatusType(transactionStatus)}
                          onChange={handleStatusSelect}
                          name='transaction_status'
                          placeholder='Select Status'
                         
                          
                      />
                      </div>
                      </div>
                      <div className='details'>
                     {details?.map(((detail: any) => {
                            return(
                                <div className='detail'>
                                <div className='detailDescription'>
                                <Form.Control
                                required
                                name="description"
                                id="description"
                                placeholder='Description'
                                onChange={(e) => setDescriptionValue(e, detail)}
                            />
                            </div>
                            <div className='secondRow'>
                            <div className='detailCategory'>
                            <Select  options={optionReturn(category)}
                                        onChange={e => setCategoryValue(e, detail)}
                                        name='category'
                                        placeholder='Select Category'
                                        required
                                        onKeyDown={(e:any) => categoryKeyDown(e)}
                                  />
                            </div>
                            <div className='detailAmount'>
                            <Form.Control
                                    type='number'
                                    required
                                    name="descriptionAmount"
                                    id="descriptionAmount"
                                    placeholder='Enter Amount'
                                    value={transactionCreate?.descriptionAmount}
                                    onChange={e => setAmountValue(e, detail)}
                                 /> 
                    </div>
                    </div>
                    <div className='deleteDetail'>
                    <Button onClick={(e) => deleteDetail(e, detail)}><DeleteIcon color='error'/></Button>
                    </div>
                            </div>
                            )  
                      }))}
                      </div>
                      <div className='buttons'>
                    <Button onClick={() => add()}> Add detail</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
                </div>
                </>
            </Form>
        </Container>
       
        </>
    )
}

export default TransactionForm