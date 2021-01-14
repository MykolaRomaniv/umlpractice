/* eslint-disable no-console */
import axios from 'axios'

const instance = axios.create({
  baseURL: `https://umlpractice-default-rtdb.firebaseio.com/`,
})

// instance.interceptors.request.use(
//   (config) => {
//     const newConfigs = { ...config }
//     const token = getState().user.auth_token
//     if (!newConfigs.headers) {
//       newConfigs.headers = {}
//     }
//     if (token) {
//       newConfigs.headers.Authorization = `Bearer ${token}`
//     }
//     return newConfigs
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// TODO fix this
const isDev = () => {
  return true
}

if (isDev()) {
  axios.interceptors.request.use(
    (config) => {
      console.log(`Sending request to ${config.baseURL}${config.url}`)
      console.log('config => ', config)
      return config
    },
    (error) => {
      console.log('Request error => ', error)
      return Promise.reject(error)
    },
  )
  axios.interceptors.response.use(
    (response) => {
      console.log(
        'Received response from ',
        response.config.baseURL,
        response.config.url,
      )
      console.log('response => ', response)
      return response
    },
    (error) => {
      console.log('Response error => ', error)
      return Promise.reject(error)
    },
  )
}

export default instance
