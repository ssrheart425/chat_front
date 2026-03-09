import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '')

const http = axios.create({
  baseURL,
  timeout: 15000,
})

export const request = (config) => http.request(config)

export default http
