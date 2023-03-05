import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
class Http {
  instance: AxiosInstance
  private AcessToken: string
  constructor() {
    this.AcessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',

      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.AcessToken && config.headers) {
          config.headers.authorization = this.AcessToken
          return config
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === '/login' || url === '/register') {
          this.AcessToken = data.data.access_token
          setAccessTokenToLS(this.AcessToken)
          setProfileToLS(data.data.user)
        } else if (url === '/logout') {
          this.AcessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
