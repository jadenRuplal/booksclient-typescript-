import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditTransactionForm from './EditTransactionForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'



const EditTransactionModal = (props:any) => {
    const {
        user, show, handleClose
    } = props
    const [transaction] = useState(props.transaction)
    const [transactionUpdate, setMapUpdate] = useState<any>({
        transaction_date: transaction?.transaction_date,
        payee: transaction?.payee?.uuid,
        account: transaction?.account?.uuid,
        amount: transaction?.amount,
        transaction_type: transaction?.transaction_type?.display_name,
        transaction_status: transaction?.transaction_status?.display_name
    })
    const dispatch = useDispatch()
    

    function handlePayeeSelect(data:any) {
        setMapUpdate({...transactionUpdate, payee: data.value})
      }

      function handleAccountSelect(data:any) {
        setMapUpdate({...transactionUpdate, account: data.value})
      }

      function handleTypeSelect(data:any) {
        setMapUpdate({...transactionUpdate, transaction_type: data.value})
      }

      function handleStatusSelect(data:any) {
        setMapUpdate({...transactionUpdate, transaction_status: data.value})
      }

      function handleDateChange(e:any) {
        setMapUpdate({...transactionUpdate, date: e.target.value})
        
      }

    const handleChange = (e:any) => {
        setMapUpdate((prevCar:any) => {
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
        const response = await api.put(user, `transaction/${transaction.uuid}`, transactionUpdate)
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
                <EditTransactionForm
                    transaction={transaction}
                    transactionUpdate={transactionUpdate}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handlePayeeSelect={handlePayeeSelect}
                    handleCategorySelect={handleDateChange}
                    handleTypeSelect={handleTypeSelect}
                    handleAccountSelect={handleAccountSelect}
                    handleStatusSelect={handleStatusSelect}
                    heading="Update transaction"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditTransactionModal



