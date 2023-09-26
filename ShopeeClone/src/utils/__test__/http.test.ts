import { describe, expect, it, beforeEach } from 'vitest'

import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { Http } from '../http'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNlQwNDo1MDoyMy43MTNaIiwiaWF0IjoxNjk1NzAzODIzLCJleHAiOjE2OTU3MDM4MjR9.lDWLlKccp3ICjUsSG_J6lAtBjbWec_F1o0Ywo2bnutA'
const refresh_token_10000s =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNlQwNDo1MDoyMy43MTNaIiwiaWF0IjoxNjk1NzAzODIzLCJleHAiOjE2OTU3MTM4MjN9.hZ4mVdP-BPvB8-9KyEKHnufEkGX7Of5wLvEa7Jx2As8'
describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    // để xóa mấy cái thuộc tính access_token và refresh_token có trong class nên mình phải clear trên localStorage và tạo lại thằng http mới
    http = new Http().instance
  })
  it('Gọi API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('auth request', async () => {
    await http.post('/login', {
      email: 'duycute2003@gmail.com',
      password: 'duy23082003'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_1s)
    // setRefreshTokenToLS(refresh_token_10000s)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
