import React, { useState } from 'react'
import { useNavigate, useResolvedPath } from 'react-router-dom'
import api from '../../api/payee'
import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import {addUser} from '../../features/userSlice'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { addOption } from '../../features/optionSlice'


type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
    setUser: any,
	user: any,
	msgAlert: (arg0: Message) => void
}


const SignIn: React.FC<componentInterface> = (props) => {
	const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
	const [user , setUser] = useState<any>(null)

	const onSignIn = (event: any) => {
		event.preventDefault()
		const { msgAlert } = props
		const userSet = async (res: any) => {
			dispatch(addUser({
				user: res.data.data
			}))
			const response = await api.get(res.data.data, `overviewoption`)
			dispatch(addOption({
			  options: response
			}))
		}


        const credentials = {email, password}

		signIn(credentials)
			.then((res) =>  userSet(res))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
	}

    return (
        <div className="login login-with-news-feed">
				<div className="news-feed">
					<div className="news-image" style={{backgroundImage: 'url(https://i.imgur.com/aF6ra0M.png)'}}></div>
					<div className="news-caption">
						<h4 className="caption-title"> myBooks App</h4>
						<p>
							Download the Color Admin app for iPhone®, iPad®, and Android™. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</div>
				</div>
				<div className="right-content">
					<div className="login-header">
						<div className="brand">
							<span className="logo"></span>  myBooks
							<small>responsive bootstrap 4 admin template</small>
						</div>
						<div className="icon">
							<i className="fa fa-sign-in"></i>
						</div>
					</div>
					<div className="login-content">

                    <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
					</div>
				</div>
			</div>
    )
}

export default SignIn
