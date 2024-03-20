
import { Modal } from 'react-bootstrap'
import FilterMappingForm from './FilterMappingForm'



const FilterMappingModal = (props:any) => {
    const {
     show, handleClose, mapFilter, setMapFilter
    } = props



    function handleMapUpdate(data:any, name:string) {
        setMapFilter({...mapFilter, [name]: data})
        console.log(mapFilter)
      }


    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton />
            <Modal.Body>
                <FilterMappingForm
                    mapFilter={mapFilter}
                    handleSubmit={handleSubmit}
                    handleMapUpdate={handleMapUpdate}
                    heading="Filter Mapping" payees={null}          />
            </Modal.Body>
        </Modal>
    )
}

export default FilterMappingModal



