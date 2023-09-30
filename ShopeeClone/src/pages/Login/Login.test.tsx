import { screen, waitFor, fireEvent } from '@testing-library/react'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
let submitButton: HTMLButtonElement
let emailInput: HTMLInputElement
let passwordInput: HTMLInputElement
beforeAll(async () => {
  renderWithRouter({ route: '/login' })
  await waitFor(() => {
    expect(screen.queryByPlaceholderText('Email'))
  })
  submitButton = document.querySelector('.button-login') as HTMLButtonElement
  emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
  passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
})
describe('Login', () => {
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    fireEvent.submit(submitButton)

    await waitFor(async () => {
      expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
      expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    })
    // await logScreen()
  })
  it('Hiển thị lỗi khi nhập value input sai', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài password phải từ 6-160 kí tự')).toBeTruthy()
    })
  })
  it('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài password phải từ 6-160 kí tự')).toBeFalsy()
    })
    fireEvent.submit(submitButton)
    await logScreen()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
  })
})
