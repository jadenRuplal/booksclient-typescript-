import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MapForm from './MapForm'
import api from '../../api/payee'


const CreateMapModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [map, setMap] = useState(props.map)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setMap((prevPayee: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedPayee = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPayee,
                ...updatedPayee
            }
        })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        api.post(user, 'payee?&with[]=created_by&with[]=updated_by' ,map)
           handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MapForm
                    map={map}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Create Map"

                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateMapModal



