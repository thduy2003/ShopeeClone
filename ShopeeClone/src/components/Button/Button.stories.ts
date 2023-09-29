import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading'
    },
    children: {
      description: 'Nội dung button',
      table: { type: { summary: 'React.ReactNode' } },
      defaultValue: { summary: 'Hello world' }
    },
    className: {
      description: 'class'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className:
      'flex w-full items-center justify-ccenter bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Đăng ký',
    className:
      'flex w-full items-center justify-ccenter bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600',
    isLoading: true,
    disabled: true
  }
}
