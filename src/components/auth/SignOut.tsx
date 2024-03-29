import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import React from 'react'





interface interfaceComponent {
    user: any
    clearUser: () => void
}


const SignOut: React.FC<interfaceComponent> = (props) => {
	const { clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small><br/>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
