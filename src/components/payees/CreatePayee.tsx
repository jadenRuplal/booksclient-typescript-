import { useState } from 'react'

import{ createPayee } from '../../api/payee'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

 
import PayeeForm from './PayeeForm'
import React from 'react'


const CreatePayee = (props:any) => {
    console.log('this is props:', props)
    const { msgAlert } = props
    const result:any = useSelector((state) => state);
    const user = result.user.value[0].user
    const navigate = useNavigate()

    const [payee, setPayee] = useState({
       name: '',
       uuid: ''
    })
    console.log('this is car in createCar', payee)

    const handleChange = (e:any) => {
        setPayee(prevPayee => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            console.log('this is the input type', e.target.type)

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

     // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e: { preventDefault: () => void }) => {
        
        e.preventDefault()

            const createOnePayee = async () => {
                await createPayee(user, payee)
                navigate('/payees')
               }
               createOnePayee()

    }

    return (
        <PayeeForm 
            payee = { payee }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new payee!"
        />
    )
}

export default CreatePayee

