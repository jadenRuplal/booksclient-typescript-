import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TransactionForm from './CreateTransactionForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const CreateTransactionModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const dispatch = useDispatch()
    const [transactionCreate, setTransactionCreate] = useState<any>({
        transaction_date: null,
        payee: null,
        account: null,
        amount: null,
        transaction_type: null,
        transaction_status: null,
        category: null,
        descriptionAmount: null,
    })
    const [details, setDetails] = useState<any>([])
    const [totalDetails, setTotalDetails] = useState(0)


    const add = () => {
      details.push({description: 'Add a description', id: details.length + 1})
      setTotalDetails(totalDetails + 1)
      console.log(details)
     }

     const closeModal = () => {
      setDetails([])
      handleClose()
     }



    function handlePayeeSelect(data:any) {
        setTransactionCreate({...transactionCreate, payee: data.value})
      }

      function handleTypeSelect(data:any) {
        console.log(data)
        setTransactionCreate({...transactionCreate, transaction_type: data.value})
      }

      function handleStatusSelect(data:any) {
        setTransactionCreate({...transactionCreate, transaction_status: data.value})
      }

      function handleAccountSelect(data:any) {
        setTransactionCreate({...transactionCreate, account: data.value})
      }

      function handleCategorySelect(data:any) {
        setTransactionCreate({...transactionCreate, category: data.value})
      }
      
      const handleChange = (e:any) => {
        setTransactionCreate((prevCar:any) => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedCar = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCar,
                ...updatedCar
            }
        })
    }

    const handleSubmit = async () => {
        try {
        const response = await api.post(user, 'transaction?&with[]=created_by&with[]=updated_by' , transactionCreate)
          const detailResponse = details?.map(async (detail:any) => { await api.createDetail(user, `transaction_detail?with[]=transaction&with[]=category`, detail, response.data.uuid)})
          handleClose()
           setDetails([])
           dispatch(
            setSnackbar(
              true,
              "success",
              response.message.messages[0]
            )
          )  
        } catch (error:any) {
            dispatch(
                setSnackbar(
                  true,
                  "error",
                  error.response.data.message.messages
                )
              )
        }
    }


    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton onClick={()=> closeModal()}/>
            <Modal.Body>
                <TransactionForm
            transactionCreate={transactionCreate}
            setDetails={setDetails}
            add={add}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePayeeSelect={handlePayeeSelect}
            handleAccountSelect={handleAccountSelect}
            handleTypeSelect={handleTypeSelect}
            handleStatusSelect={handleStatusSelect}
            handleCategorySelect={handleCategorySelect}
            details={details}
            heading="Create Transaction" setValue={undefined}
                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateTransactionModal



