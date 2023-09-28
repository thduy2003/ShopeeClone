import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// import '@testing-library/jest-dom'
expect.extend(matchers)

describe('App', () => {
  test('App render and switch page', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()
    //verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
    //verify chuyển sang trong login
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
    screen.debug(document.body.parentElement as HTMLElement, Infinity)
  })
})
