import apiUrl from '../apiConfig'
import axios from 'axios'
import {env} from '../env'

type User = {
    user: {
        sessions: [{
            session_id: number,
            id: string,
        }]
        email: string,

    },
    payeeId: any,
    
}
// let apiUrl: any




export const deletePayee = async (user: User["user"], endpoint:string) => {
    return axios({
        url: `${apiUrl}/api/${endpoint}`,
        method: 'DELETE',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
		},
    })
}


export const createPayee = (user: User["user"], newPayee:any) => {
    return axios({
        url: apiUrl + '/api/payee',
        method: 'POST',
        headers: {
            sid: `${user.sessions[0].id}`,
			'api-key': `Ml29vjhslk2873!`,
        },
        data:  newPayee 
    })
}



export default {
    async get (user: User["user"], endpoint: string) {
        const response = await axios({
            url: apiUrl + '/api/' + endpoint,
            method: 'get',
            headers: {
                sid: `${user.sessions[0].id}`,
                'api-key': env.apiKey
            },
        })
        return response.data
    },
    async post (user: User["user"], endpoint: string, newPayee:any) {
        const response = await axios({
            url: apiUrl + '/api/' + endpoint,
            method: 'post',
            headers: {
                sid: `${user.sessions[0].id}`,
                'api-key': env.apiKey
            },
            data: newPayee
        })
        return response.data
    },

    async put (user: User["user"], endpoint: string, data: object = {}) {
        const response = await axios({
            url: apiUrl + '/api/' + endpoint,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                sid: `${user.sessions[0].id}`,
                'api-key': env.apiKey
            },
            data: data
        })
        return response.data
    },
    
    async delete (user: User["user"], endpoint: string, data: object = {}) {
        const response = await axios({
            url: apiUrl + '/api/' + endpoint,
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                sid: `${user.sessions[0].id}`,
                'api-key': env.apiKey
            },
            data: data
        })
        return response.data
    }
}