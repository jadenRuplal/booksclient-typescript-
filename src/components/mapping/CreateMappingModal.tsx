import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreateMapForm from './CreateMapForm'
import api from '../../api/payee'


const CreateMapModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [mapCreate, setMapCreate] = useState<any>({
        description: null,
        payee: null,
        category: null
    })

    
    function handlePayeeSelect(data:any) {
        setMapCreate({...mapCreate, payee: data.value})
      }

      function handleCategorySelect(data:any) {
        setMapCreate({...mapCreate, category: data.value})
      }
      function handleChange(e:any) {
        setMapCreate({...mapCreate, description: e.target.value})
      }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        api.post(user, 'mapping?&with[]=created_by&with[]=updated_by' , mapCreate)
           handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CreateMapForm
                    mapCreate={mapCreate}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handlePayeeSelect={handlePayeeSelect}
                    handleCategorySelect={handleCategorySelect}
                    heading="Create Map"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateMapModal



