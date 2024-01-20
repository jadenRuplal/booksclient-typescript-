import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FilterTransactionForm from './FilterTransactionForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const FilterTransactionModal = (props:any) => {
    const {
        user, show, handleClose, setTransactions
    } = props
    const dispatch = useDispatch()
    const [transactionFilter, setTransactionFilter] = useState<any>({
        transaction_date: null,
        payee: null,
        account: null,
        amount: null,
        transaction_type: null,
        transaction_status: undefined
    })



    function handlePayeeSelect(data:any) {
        setTransactionFilter({...transactionFilter, payee: data.value})
        console.log(transactionFilter)
      }

      function handleTypeSelect(data:any) {
        setTransactionFilter({...transactionFilter, transaction_type: data.value})
        console.log(transactionFilter)
      }

      function handleStatusSelect(data:any) {
        setTransactionFilter({...transactionFilter, transaction_status: data.value})
        
      }

      function handleAccountSelect(data:any) {
        setTransactionFilter({...transactionFilter, account: data.value})
        console.log(transactionFilter)
      }
      const handleChange = (e:any) => {
        setTransactionFilter((prevCar:any) => {
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

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
        const response = await api.get(user, `transaction?filters[account.uuid]=${transactionFilter.account}&with[]=payee&with[]=account&with[]=transaction_type&with[]=transaction_status`)
          setTransactions(response.data?.results)
          handleClose()
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <FilterTransactionForm
                    transactionFilter={transactionFilter}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handlePayeeSelect={handlePayeeSelect}
                    handleAccountSelect={handleAccountSelect}
                    handleTypeSelect={handleTypeSelect}
                    handleStatusSelect={handleStatusSelect}
                    heading="Filter Transactions"
                />
            </Modal.Body>
        </Modal>
    )
}

export default FilterTransactionModal



