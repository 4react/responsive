import { storiesOf } from '@storybook/react'
import React from 'react'
import ResponsiveStory from './Responsive.story'
import UseResponsiveStory from './useResponsiveStory'

storiesOf('stories/.', module)
  .add('Responsive', ResponsiveStory)
  .add('useResponsive', UseResponsiveStory)
