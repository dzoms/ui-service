import axios from 'axios'
import { config } from '../../Constants'

export const notificationApi = {
  createNotification,
  getNotifications
}

function createNotification(token, userId, roomId) {
  return instance.post(`/api/v1/notification-service/${userId}`, roomId, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
     }
  })
}

function getNotifications(token) {
  return instance.get(`/api/v1/notification-service`, {
    headers: {
      'Authorization': bearerAuth(token),
      'Content-Type': 'application/json'
    }
  })
}


// -- Axios

const instance = axios.create({
  baseURL: config.url.API_NOTIFICATION_SERVICE
})

function bearerAuth(token) {
  return `Bearer ${token}`
}