import { screen, waitFor, fireEvent } from '@testing-library/react'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
beforeAll(async () => {
  renderWithRouter({ route: '/login' })
  await waitFor(() => {
    expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
  })
})
describe('Login', () => {
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const submitButton = document.querySelector('.button-login') as Element

    fireEvent.submit(submitButton)

    await waitFor(async () => {
      expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
      expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    })
    // await logScreen()
  })
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const submitButton = document.querySelector('.button-login') as Element
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
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

    expect(await screen.findByText('Email không đúng định dạng')).toBeTruthy()
    expect(await screen.findByText('Độ dài password phải từ 6-160 kí tự')).toBeTruthy()
  })
})
