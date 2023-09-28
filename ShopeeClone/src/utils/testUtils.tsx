import { screen, waitFor, waitForOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      //-100 để cho nó resolve về kết quả trước thời gian timeout
      expect(await delay(timeout - 100)).toBe(true)
    },
    { ...options, timeout }
  )
  screen.debug(body, Infinity)
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
    }
  })
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}
const Provider = createWrapper()
export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'test page', route)
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
