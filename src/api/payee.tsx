import apiUrl from '../apiConfig'
import axios from 'axios'


export const getAllPayees = async (user) => {
    return axios({
        url: `${apiUrl}/api/payee?filters[search]=&orderby=name&sortby=asc`,
        method: 'GET',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const getPayee = async (user, payeeId) => {
    return axios({
        url: `${apiUrl}/api/payee/${payeeId}`,
        method: 'GET',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const updatePayee = async (user, updatedPayee) => {
    return axios({
        url: `${apiUrl}/api/payee/${updatedPayee.uuid}`,
        method: 'PUT',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}

export const deletePayee = async (user, payeeId) => {
    return axios({
        url: `${apiUrl}/api/payee/${payeeId}`,
        method: 'DELETE',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}