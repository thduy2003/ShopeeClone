import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'
import config from './src/constants/config'
import HttpStatusCode from './src/constants/httpStatusCode.enum'
const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yOFQxNToyNjozMy42MjNaIiwiaWF0IjoxNjk1OTE0NzkzLCJleHAiOjE2OTU5MjQ3OTJ9.9DnJZwDwVmybDGSsqwXm2xSX1g_pl5WQUa9OeQMS4T8',
    expires: 9999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yOFQxNToyNjozMy42MjNaIiwiaWF0IjoxNjk1OTE0NzkzLCJleHAiOjE2OTU5MjQ3OTN9.Mqj63FcYZf3_294KuHqdUdDCdFKWTvbyIWXZ_YKnTQY',
    expires_refresh_token: 10000,
    user: {
      _id: '65083f4997e95903372f266d',
      roles: ['User'],
      email: 'duycute2003@gmail.com',
      createdAt: '2023-09-18T12:15:05.212Z',
      updatedAt: '2023-09-22T01:02:27.160Z',
      __v: 0,
      avatar: 'f3c9f2dd-0352-4370-8c32-9ec8a1a1766f.jpg',
      date_of_birth: '1989-12-31T17:00:00.000Z'
    }
  }
}
export const restHandlers = [
  rest.post(`${config.baseURL}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
