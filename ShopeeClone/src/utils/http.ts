import axios, { AxiosError, AxiosRequestConfig, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { isAxiosExpiredRefreshTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'
class Http {
  instance: AxiosInstance
  private AccessToken: string
  private RefreshToken: string
  private RefreshTokenRequest: Promise<string> | null
  constructor() {
    this.AccessToken = getAccessTokenFromLS()
    this.RefreshToken = getRefreshTokenFromLS()
    this.RefreshTokenRequest = null

    this.instance = axios.create({
      baseURL: config.baseURL,

      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.AccessToken && config.headers) {
          console.log('this.AccessToken', this.AccessToken)
          config.headers.authorization = this.AccessToken
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
          console.log('this.AccessToken', this.AccessToken)
          console.log('data.data.access_token', data.data.access_token)
          this.AccessToken = data.data.access_token
          this.RefreshToken = data.data.refresh_token
          setAccessTokenToLS(this.AccessToken)
          setRefreshTokenToLS(this.RefreshToken)
          setProfileToLS(data.data.user)
        } else if (url === '/logout') {
          this.AccessToken = ''
          this.RefreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config: AxiosRequestConfig = error.response?.config || {}

          const { url }: any = config
          console.log(config)

          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredRefreshTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // hạn chế gọi 2 lần handleRefreshToken
            //truthy nếu nó là một đối tượng, còn falsy nếu nó là null nha anh em
            this.RefreshTokenRequest = this.RefreshTokenRequest
              ? this.RefreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.RefreshTokenRequest = null
                  }, 10000)
                })
            return this.RefreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS()
          this.AccessToken = ''
          this.RefreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.RefreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.AccessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.AccessToken = ''
        this.RefreshToken = ''
        clearLS()
        throw error
      })
  }
}
const http = new Http().instance
export default http
