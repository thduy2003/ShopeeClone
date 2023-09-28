import { screen, waitFor } from '@testing-library/react'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
describe('Login', () => {
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const { user } = renderWithRouter({ route: '/login' })

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })

    const submitButton = document.querySelector('.button-login') as Element

    user.click(submitButton)

    expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
    expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    // await logScreen()
  })
})
