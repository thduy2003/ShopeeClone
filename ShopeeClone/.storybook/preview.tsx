import { HelmetProvider } from 'react-helmet-async'

import type { Preview, Story } from '@storybook/react'
import React from 'react'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import ErrorBoundary from '../src/components/ErrorBoundary'
import { withRouter } from 'storybook-addon-react-router-v6'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}
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
export const decorators = [
  withRouter,
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HelmetProvider>
          <ErrorBoundary></ErrorBoundary>
          <Story />
        </HelmetProvider>
      </AppProvider>
    </QueryClientProvider>
  )
]
export default preview
