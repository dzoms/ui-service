import axios from 'axios'
import { config } from '../../Constants'

export const userContactApi = {
  createUserContact,
  getUserContact
}

function createUserContact(token, userId) {
  return instance.post(`/api/v1/user-contact`, JSON.stringify(userId), {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
     }
  })
}

function getUserContact(token, userId) {
  return instance.get(`/api/v1/user-contact/${userId}`, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
    }
  })
}


// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

function bearerAuth(token) {
  return `Bearer ${token}`
}