import type { Meta, StoryObj } from '@storybook/react'

import MainLayout from './MainLayout'
import ProductDetail from 'src/pages/ProductDetail'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'layout/MainLayout',
  component: MainLayout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: 'Body của layout',
      table: { type: { summary: 'React.ReactNode' } }
    }
  }
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PageProductDetail: Story = {
  args: {
    children: <ProductDetail />
  },
  parameters: {
    reactRouter: {
      routePath: '/:nameId',
      routeParams: {
        nameId: 'Điện-thoại-OPPO-A12-3GB32GB--Hàng-chính-hãng-i,60afb2426ef5b902180aacb9'
      }
    }
  }
}
