import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import React from 'react'
import { deletePayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import EditPayeeModal from './EditPayeeModal'
import api from '../../api/payee'

type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
	msgAlert: (arg0: Message) => void,
    updatePayee: () => void,
    payee: {
        name: string,
        uuid: string
    } | null,
    
}

const ShowPayee: React.FC<componentInterface> = (props) => {
    const [payee, setPayee] = useState<any>(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user;
    const {  msgAlert } = props

    useEffect(() => {
        const getOnePayee = async () => {
                const response = await api.get(user, `payee/${id}`)
                setPayee(response.data)
               }
               getOnePayee()
    }, [])

    const deleteThePayee = () => {
        deletePayee(user, `payee/${payee?.uuid}`)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePayeeSuccess,
                    variant: 'success'
                })
            })
            .then(() => { navigate('/payees') })
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
                    <Card.Header >{payee?.name}</Card.Header>
                    <Card.Body >
                    <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Edit payee
                                </Button>

                                <Button onClick={() => deleteThePayee()}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Delete payee
                                </Button>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

     
            </Container>
          { payee &&
            <EditPayeeModal
                user={user}
                payee={payee}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
          }
        </>
    )
}



export default ShowPayee