import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FilterPayeeForm from './FilterPayeeForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const FilterPayeeModal = (props:any) => {
    const {
        user, show, handleClose, setPayees
    } = props
    const dispatch = useDispatch()
    const [payeeFilter, setPayeeFilter] = useState<any>('')



    // function handlePayeeSelect(data:any) {
    //     setPayeeFilter({...payeeFilter, payee: data.value})
    //     console.log(payeeFilter)
    //   }

    

    
      const handleChange = (e:any) => {
        setPayeeFilter((prevCar:any) => {
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
        const response = await api.get(user, `payee?filters[search]=${payeeFilter}`)
          setPayees(response.data?.results)
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
                <FilterPayeeForm
                    payeeFilter={payeeFilter}
                    handleChange={handleChange}
                    setPayeeFilter={setPayeeFilter}
                    handleSubmit={handleSubmit}
                    heading="Filter Payee"
                />
            </Modal.Body>
        </Modal>
    )
}

export default FilterPayeeModal



