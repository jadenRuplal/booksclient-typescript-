import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'
// import LoadingScreen from '../shared/LoadingScreen'
import { deletePayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import EditPayeeModal from './EditPayeeModal'
import api from '../../api/payee'

// We need to get the car's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
    user: any,
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
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user;
    const {  msgAlert } = props
    // destructuring to get the id value from our route parameters



    useEffect(() => {
    //    const getpayee = getPayee(user, id)
    //         .then(res => { return setPayee(res.data.data)})
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting car',
    //                 message: messages.getPayeeFailure,
    //                 variant: 'danger'
    //             })
    //             // navigate('/myCars')
    //             //navigate back to the home page if there's an error fetching
    //         })
        const getOnePayee = async () => {
                const response = await api.get(user, `payee/${id}`)
                setPayee(response.data)
               }
               getOnePayee()
    }, [])

    // 
console.log('this is payee', payee)
    const deleteThePayee = () => {
        deletePayee(user, payee?.uuid)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePayeeSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => { navigate('/payees') })
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing car',
                    message: messages.removePayeeFailure,
                    variant: 'danger'
                })
            })
    }
    
    // if (!payee) {
    //     return <LoadingScreen />
    // }


    return (
        <>
            <Container className="fluid">
                <Card >
                    <Card.Header >{payee?.name}</Card.Header>
                    <Card.Body >
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
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
                    </Card.Footer>
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