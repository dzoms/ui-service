import axios from 'axios'
import { config } from '../../Constants'

export const userSettingsApi = {
  createUserSettings,
  getUserSettings,
  getAll,
}

function createUserSettings(token, settingsTo) {
  return instance.post(`/api/v1/user-settings`, settingsTo, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
     }
  })
}

function getUserSettings(token, id) {
  return instance.get(`/api/v1/user-settings/${id}`, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
    }
  })
}

function getAll(token) {
  return instance.get(`/api/v1/user-settings`, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
    }
  })
}


// -- Axios

const instance = axios.create({
  baseURL: config.url.API_USER_SETTINGS_SERVICE
})

function bearerAuth(token) {
  return `Bearer ${token}`
}