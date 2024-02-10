import apiUrl from '../apiConfig'
import axios from 'axios'



type User = {
    user: {
        sessions: [{
            session_id: number,
            id: string,
        }]
        email: string,
		
    },
    
}

type Passwords = {
	oldPassword: string,
	newPassword: string
	
}

export const signUp = (credentials: any) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials: any) => {
	return axios({
		url: apiUrl + '/api/auth/login',
		method: 'POST',
		headers: {
			'api-key': `Ml29vjhslk2873!`,
		},
		data: {
				email: credentials.email,
				password: credentials.password,
		},
		
	})
}

export const signOut = (user: User["user"]) => {
	return axios({
		url: apiUrl + '/api/auth/logout',
		method: 'POST',
		headers: {
			sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
	})
}

export const changePassword = (passwords: Passwords, user: any) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
