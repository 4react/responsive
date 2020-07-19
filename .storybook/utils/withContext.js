import { object } from '@storybook/addon-knobs'
import React from 'react'
import ResponsiveProvider from '../../src/components/ResponsiveProvider'

const withContext = (Story) => {
  const breakpoints = object('breakpoints', { mobile: 0, tablet: 400, desktop: 800 }, 'props')

  return (
    <ResponsiveProvider breakpoints={breakpoints}>
      <Story />
    </ResponsiveProvider>
  )
}

export default withContext
