import React from 'react'
import { Modal } from 'react-bootstrap'
import FilterAccountForm from './FilterAccountForm'


interface componentInterface {
    show:boolean,
    closing: () => void,
    setAccounts: any,
    accountFilter: any,
    setAccountFilter: any,
    handleClose: () => void


   }

const FilterPayeeModal: React.FC<componentInterface> = (props:any) => {
    const {
         show, handleClose, accountFilter, setAccountFilter
    } = props
  

    function handleAccountFilter(data:{value:string}, name:any) {
        setAccountFilter({...accountFilter, [name]: data.value})
        console.log(data, name)
      }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        handleClose()
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



