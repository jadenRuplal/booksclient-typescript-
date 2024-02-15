import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FilterAccountForm from './FilterAccountForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


interface componentInterface {
    user: any,
    show:boolean,
    closing: () => void,
    setAccounts: any,
    accountFilter: any,
    setAccountFilter: any,
    handleClose: () => void


   }

const FilterPayeeModal: React.FC<componentInterface> = (props:any) => {
    const {
        user, show, handleClose, setAccounts, accountFilter, setAccountFilter
    } = props
    const dispatch = useDispatch()
  

    function handleAccountFilter(data:{value:string}, name:any) {
        setAccountFilter({...accountFilter, [name]: data.value})
        console.log(data, name)
      }

    
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
                    handleChange={handleAccountFilter}
                    setAccountFilter={setAccountFilter}
                    handleSubmit={handleSubmit}
                    heading="Filter Account"
                />
            </Modal.Body>
        </Modal>
    )
}

export default FilterPayeeModal



