import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator, addParameters, configure } from '@storybook/react'
import withContext from './utils/withContext'

addDecorator(withKnobs)
addDecorator(withContext)

addParameters({
  options: {
    name: '@4react/forms',
    showPanel: true,
    panelPosition: 'right'
  },
  knobs: {
    escapeHTML: false
  }
})

require('./style.css')

configure(() => {
  require('./stories/_stories.js')
}, module)
