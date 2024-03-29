import { Modal } from 'react-bootstrap'
import FilterCategoryForm from './FilterPayeeForm'


const FilterCategoryModal = (props:any) => {
    const {
         show, handleClose, payeeFilter, setPayeeFilter
    } = props


    function handlePayeeUpdate(data:string) {
        setPayeeFilter(data)
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
            payeeFilter={payeeFilter}
            handleSubmit={handleSubmit}
            handlePayeeUpdate={handlePayeeUpdate}
            heading="Filter Transactions"              />
            </Modal.Body>
        </Modal>
    )
}

export default FilterCategoryModal



