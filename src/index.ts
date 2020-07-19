// components
import * as responsiveProvider from './components/ResponsiveProvider'
import * as responsive from './components/ResponsiveProvider'
// context
import * as responsiveContext from './core/context/ResponsiveContext'
import * as responsiveContextValue from './core/context/ResponsiveContextValue'
// model
import * as breakpoints from './core/model/Breakpoints'
import * as breakpointsMap from './core/model/BreakpointsMap'
// hooks
import * as useCurrentBreakpoint from './hooks/useCurrentBreakpoint'
import * as useIsBreakpointDetected from './hooks/useIsBreakpointDetected'
import * as useResponsive from './hooks/useResponsive'
import * as useResponsiveCondition from './hooks/useResponsiveCondition'

export default {
  ...responsiveProvider,
  ...responsive,
  ...responsiveContext,
  ...responsiveContextValue,
  ...breakpoints,
  ...breakpointsMap,
  ...useCurrentBreakpoint,
  ...useIsBreakpointDetected,
  ...useResponsive,
  ...useResponsiveCondition
}
