import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import * as matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { logScreen, renderWithRouter } from './utils/testUtils'
// import '@testing-library/jest-dom'
expect.extend(matchers)

describe('App', () => {
  test('App render and switch page', async () => {
    const { user } = renderWithRouter()
    //verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
    //verify chuyển sang trong login
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?'))
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })
  test('Back to page not found', async () => {
    const badRoute = '/some/bad/router'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page not found/i))
    })
    screen.debug(document.body.parentElement as HTMLElement, Infinity)
  })
  test('Render register page', async () => {
    renderWithRouter({ route: '/register' })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i))
    })
  })
})
