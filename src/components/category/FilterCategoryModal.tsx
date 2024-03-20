import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FilterCategoryForm from './FilterCategoryForm'


const FilterCategoryModal = (props:any) => {
    const {
       show, handleClose, categoryFilter, setCategoryFilter
    } = props



    function handleCategoryUpdate(data:any, name:string) {
        setCategoryFilter({...categoryFilter, [name]: data})
      }


    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton />
            <Modal.Body>
                <FilterCategoryForm
            categoryFilter={categoryFilter}
            handleSubmit={handleSubmit}
            handleCategoryUpdate={handleCategoryUpdate}
            heading="Filter Transactions"              />
            </Modal.Body>
        </Modal>
    )
}

export default FilterCategoryModal



