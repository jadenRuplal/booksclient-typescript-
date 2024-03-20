import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditCategoryForm from './EditCategoryForm'
import api from '../../api/payee'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../features/snackSlice'


const EditCategoryModal = (props:any) => {
    const {
        user, show, handleClose,
    } = props
    const [category] = useState(props.category)
    const [categoryEdit, setCategoryEdit] = useState<any>({
        name: category.name,
        category_type: category.category_type.name
    })
    const dispatch = useDispatch()

const updateCategory = (e:any, name:string) => {
    setCategoryEdit({...categoryEdit, [name]: e.target.value})
}

    function handleSelect(data:any, name:string) {
        setCategoryEdit({...categoryEdit, [name]: data.value})
      }


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
        const response = await api.put(user, `category/${category.uuid}?with[]=category_type&with[]=parent_category`, categoryEdit)
             handleClose()
             dispatch(
                setSnackbar(
                  true,
                  "success",
                  response.message.messages[0]
                )
              )
        } catch (error:any) {
            dispatch(
                setSnackbar(
                  true,
                  "error",
                  error.response.data.message.messages
                )
              )
        }
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EditCategoryForm
                    category={category}
                    handleSubmit={handleSubmit}
                    updateCategory={updateCategory}
                    categoryEdit={categoryEdit}
                    handleClose={handleClose}
                    heading="Update category" handleSelect={handleSelect} selectedOptions={''}                                  />
            </Modal.Body>
        </Modal>
    )
}

export default EditCategoryModal


