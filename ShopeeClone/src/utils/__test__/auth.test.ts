import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNlQwNDowMTowMy45MjdaIiwiaWF0IjoxNjk1NzAwODYzLCJleHAiOjE2OTU3ODcyNjN9.YocmjpL9GXGkm41xMS0Nr5cS3BiZVwRVUxdhsCU5ChA'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzZjQ5OTdlOTU5MDMzNzJmMjY2ZCIsImVtYWlsIjoiZHV5Y3V0ZTIwMDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNlQwNDowMTowMy45MjdaIiwiaWF0IjoxNjk1NzAwODYzLCJleHAiOjE3MDk1MjQ4NjN9.uQOZTyVS0CTO9lhoFFTh7iaXMchAwx6ya-h2HkjdzkI'

const profile =
  '{"_id":"65083f4997e95903372f266d","roles":["User"],"email":"duycute2003@gmail.com","createdAt":"2023-09-18T12:15:05.212Z","updatedAt":"2023-09-22T01:02:27.160Z","__v":0,"avatar":"f3c9f2dd-0352-4370-8c32-9ec8a1a1766f.jpg","date_of_birth":"1989-12-31T17:00:00.000Z"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token được set vào localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được set vào localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, refresh_token, profile', () => {
    setRefreshTokenToLS(refresh_token)
    setAccessTokenToLS(access_token)
    // setProfile tại đây
    // ...
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})
