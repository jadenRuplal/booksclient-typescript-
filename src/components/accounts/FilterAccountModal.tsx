import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FilterAccountForm from './FilterAccountForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const FilterPayeeModal = (props:any) => {
    const {
        user, show, handleClose, setAccounts
    } = props
    const dispatch = useDispatch()
    const [accountFilter, setAccountFilter] = useState<any>(
       { 
        account_type: null
       }
    )

    

    
      const handleChange = (e:any) => {
        setAccountFilter((prevCar:any) => {
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
        const response = await api.get(user, `account?filters[account_type.name]=${accountFilter.account_type}`)
          setAccounts(response.data?.results)
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
                <FilterAccountForm
                    accountFilter={accountFilter}
                    handleChange={handleChange}
                    setAccountFilter={setAccountFilter}
                    handleSubmit={handleSubmit}
                    heading="Filter Account"
                />
            </Modal.Body>
        </Modal>
    )
}

export default FilterPayeeModal


