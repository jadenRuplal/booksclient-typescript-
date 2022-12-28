import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { deletePayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import EditCategoryModal from './EditCategoryModal'
import api from '../../api/payee'
import React from 'react'

type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
	msgAlert: (arg0: Message) => void,
    updatePayee: () => void,
    category: {
        name: string,
        uuid: string
    } | null,
    
}


const ShowCategory: React.FC<componentInterface> = (props) => {
    const [category, setCategory] = useState<any>(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user;
    const {  msgAlert } = props


    useEffect(() => {
   
        const getOneCategory = async () => {
                const response = await api.get(user, `category/${id}`)
                setCategory(response.data)
               }
               getOneCategory()
    }, [])

    const deleteTheCategory = () => {
        deletePayee(user, `category/${category?.uuid}`)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePayeeSuccess,
                    variant: 'success'
                })
            })
            .then(() => { navigate('/categories') })
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
                    <Card.Header >{category?.name}</Card.Header>
                    <Card.Body >
                    <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Edit Category
                                </Button>

                                <Button onClick={() => deleteTheCategory()}
                                    className="m-2"
                                    variant="warning"
                                 >
                                    Delete Category
                                </Button>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>

     
            </Container>
          { category &&
            <EditCategoryModal
                user={user}
                category={category}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
          }
        </>
    )
}



export default ShowCategory