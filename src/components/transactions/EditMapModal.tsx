import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditMapForm from './EditMapForm'
import api from '../../api/payee'


const EditMapModal = (props:any) => {
    const {
        user, show, handleClose, closing
    } = props
    const [transaction, setMap] = useState(props.transaction)
    const [payeeTypeUpdate, setPayeeTypeUpdate] = useState({})
    const [categoryTypeUpdate, setCategoryTypeUpdate] = useState(null)
    const [transactionUpdate, setMapUpdate] = useState<any>({
        transaction_date: transaction?.transaction_date,
        payee: transaction?.payee?.uuid,
        account: transaction?.account?.uuid,
        amount: transaction?.amount
    })
    console.log(transactionUpdate)

    function handlePayeeSelect(data:any) {
        setMapUpdate({...transactionUpdate, payee: data.value})
      }

      function handleAccountSelect(data:any) {
        setMapUpdate({...transactionUpdate, account: data.value})
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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        api.put(user, `transaction/${transaction.uuid}`, transactionUpdate)
        handleClose()
          
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EditMapForm
                    transaction={transaction}
                    transactionUpdate={transactionUpdate}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handlePayeeSelect={handlePayeeSelect}
                    handleCategorySelect={handleDateChange}
                    heading="Update transaction"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMapModal



