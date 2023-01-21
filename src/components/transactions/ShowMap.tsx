import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import React from 'react'
import { deletePayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import EditMapModal from './EditMapModal'
import api from '../../api/payee'

type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
	msgAlert: (arg0: Message) => void,
    updateMap: () => void,
    map: {
        name: string,
        uuid: string
    } | null,
    
}

const ShowMap: React.FC<componentInterface> = (props) => {
    const [map, setMap] = useState<any>(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user;
    const {  msgAlert } = props

    useEffect(() => {
        const getOneMap = async () => {
                const response = await api.get(user, `map/${id}`)
                setMap(response.data)
               }
               getOneMap()
    }, [])

    const deleteTheMap = () => {
        deletePayee(user, `map/${map?.uuid}`)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePayeeSuccess,
                    variant: 'success'
                })
            })
            .then(() => { navigate('/mapping') })
            .catch(err => {
                msgAlert({
                    heading: 'Error removing ',
                    message: messages.removePayeeFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Container className="fluid">
                <Card >
                    <Card.Header >{map?.name}</Card.Header>
                    <Card.Body >
                    <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Edit Map
                                </Button>

                                <Button onClick={() => deleteTheMap()}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Delete Map
                                </Button>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

     
            </Container>
          { map &&
            <EditMapModal
                user={user}
                map={map}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
          }
        </>
    )
}



export default ShowMap