import apiUrl from '../apiConfig'
import axios from 'axios'

type User = {
    user: {
        sessions: [{
            session_id: Number,
            id: String,
        }]
        email: String,

    },
    payeeId: String,
}
let apiUrl: any


export const getAllPayees = async (user: User) => {
    return axios({
        url: `${apiUrl}/api/payee?filters[search]=&orderby=name&sortby=asc`,
        method: 'GET',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const getPayee = async (user: User, payeeId: User) => {
    return axios({
        url: `${apiUrl}/api/payee/${payeeId}`,
        method: 'GET',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const updatePayee = async (user: User, updatedPayee: any) => {
    return axios({
        url: `${apiUrl}/api/payee/${updatedPayee.uuid}`,
        method: 'PUT',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const deletePayee = async (user: User, payeeId: User) => {
    return axios({
        url: `${apiUrl}/api/payee/${payeeId}`,
        method: 'DELETE',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}