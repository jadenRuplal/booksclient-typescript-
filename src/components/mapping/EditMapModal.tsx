import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MapForm from './MapForm'
import api from '../../api/payee'
import { updatePayeeSuccess, updatePayeeFailure } from '../shared/AutoDismissAlert/messages'


const EditMapModal = (props:any) => {
    const {
        user, show, handleClose, msgAlert
    } = props
    const [map, setMap] = useState(props.map)

    const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setMap((prevMap: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedMap = {
                [updatedName]: updatedValue
            }
            return {
                ...prevMap,
                ...updatedMap
            }
        })
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        api.put(user, `mapping/${map.uuid}`, map)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePayeeSuccess,
                    variant: 'success'
                })
            })
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePayeeFailure,
                    variant: 'danger'
                })
            )
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MapForm
                    map={map}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Payee"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMapModal



