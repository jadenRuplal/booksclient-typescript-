import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import {addUser} from '../../features/userSlice'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'

type res = {
	data: {
		data: {
			id: Number,
			uuid: String,
			first_name: String,
			last_name: String,
		}
	}
}


type Message = {
    heading: any,
    message: any,
    variant: any
}

interface componentInterface {
    setUser: any,
	msgAlert: (arg0: Message) => void
}


const SignIn: React.FC<componentInterface> = (props) => {
	const dispatch = useDispatch()
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event: any) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props
		

        const credentials = {email, password}

		signIn(credentials)
			.then((res) =>  
			dispatch(addUser({
				user: res.data.data
			})))
			.then()
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
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
						{/* <form className="margin-bottom-0" onSubmit={onSignIn(cre)}>
							<div className="form-group m-b-15">
								<input type="text" className="form-control form-control-lg" placeholder="Email Address" required  />
							</div>
							<div className="form-group m-b-15">
								<input type="password" className="form-control form-control-lg" placeholder="Password" required />
							</div>
							<div className="checkbox checkbox-css m-b-30">
								<input type="checkbox" id="remember_me_checkbox" value="" />
								<label htmlFor="remember_me_checkbox">
									Remember Me
								</label>
							</div>
							<div className="login-buttons">
								<button type="submit" className="btn btn-success btn-block btn-lg">Sign me in</button>
							</div>
							<div className="m-t-20 m-b-40 p-b-40 text-inverse">
								Not a member yet? Click <Link to="/user/register-v3" className="text-success">here</Link> to register.
							</div>
							<hr />
							<p className="text-center text-grey-darker">
								&copy; Color Admin All Right Reserved 2019
							</p>
						</form> */}
					</div>
				</div>
			</div>
    )
}

export default SignIn
