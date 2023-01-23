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
    const [mapUpdate, setMapUpdate] = useState<any>({
        description: '',
        payee: '',
        category: ''
    })

    function handlePayeeSelect(data:any) {
        setMapUpdate({...mapUpdate, payee: data.value})
      }

      function handleCategorySelect(data:any) {
        setMapUpdate({...mapUpdate, category: data.value})
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
        api.put(user, `transaction/${transaction.uuid}`, mapUpdate)
        handleClose()
          
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EditMapForm
                    map={transaction}
                    mapUpdate={mapUpdate}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handlePayeeSelect={handlePayeeSelect}
                    handleCategorySelect={handleCategorySelect}
                    heading="Update Map"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMapModal



