import { screen, waitFor, waitForOptions } from '@testing-library/react'
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
