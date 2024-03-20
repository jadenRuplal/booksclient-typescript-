import React from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { deletePayee } from '../../api/payee'


interface componentInterface {
    account: {
        account_type: {
            display_name: string
        },
        last4: number,
        name: string,
        uuid:number
    },
    handleChange: (e:{target:{ value:string }}) => void,
    handleSubmit: (e: { preventDefault: () => void }) => void,
    heading: string,
    handleSelect: any,
    handleClose: () => void,
    nameUpdate: string
    
}

const AccountForm: React.FC<componentInterface> = (props) => {
    const { account, handleChange, handleSubmit, heading, handleSelect, handleClose, nameUpdate } = props
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const categoryOptions = result.option.value[0].options.data.account_type
    
    const optionType = () => {
        return( categoryOptions?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
        )
    ))
        }

        const deleteThePayee = async () => {
        const response = await deletePayee(user, `account/${account?.uuid}`)
            handleClose()
        }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    value={nameUpdate}
                    onChange={handleChange}
                    required
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Select  options={optionType()}
                onChange={handleSelect}
                placeholder={account.account_type.display_name}
                />
                <Button onClick={() => deleteThePayee()}
                    className="m-2"
                    variant="warning">Delete Category</Button>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default AccountForm