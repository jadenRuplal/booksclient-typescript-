import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { deletePayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import EditAccountModal from './EditAccountModal'
import api from '../../api/payee'
import React from 'react'

type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
	msgAlert: (arg0: Message) => void,
    updateAccount: () => void,
    payee: {
        name: string,
        uuid: string
    } | null,
    
}


const ShowAccount: React.FC<componentInterface> = (props) => {
    const [account, setAccount] = useState<any>(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user;
    const {  msgAlert } = props


    useEffect(() => {
        const getOneAccount = async () => {
                const response = await api.get(user, `account/${id}`)
                setAccount(response.data)
               }
               getOneAccount()
    }, [])

    const deleteTheAccount = () => {
        deletePayee(user, `account/${account?.uuid}`)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePayeeSuccess,
                    variant: 'success'
                })
            })
            .then(() => { navigate('/accounts') })
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
                    <Card.Header >{account?.name}</Card.Header>
                    <Card.Body >
                    <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Edit Account
                                </Button>

                                <Button onClick={() => deleteTheAccount()}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Delete Account
                                </Button>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

     
            </Container>
          { account &&
            <EditAccountModal
                user={user}
                account={account}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
          }
        </>
    )
}



export default ShowAccount