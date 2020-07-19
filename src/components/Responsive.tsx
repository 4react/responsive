import React, { ComponentType, FC, ReactChildren } from 'react'
import useCurrentBreakpoint from '../hooks/useCurrentBreakpoint'
import useResponsiveCondition, { BreakpointCondition } from '../hooks/useResponsiveCondition'

export interface ResponsiveProps {
  condition: BreakpointCondition
  component?: ComponentType<any>
  render?: (current: string) => ReactChildren
}

const Responsive: FC<ResponsiveProps> = (props) => {
  const {
    condition,
    component: ComponentToRender,
    render,
    children
  } = props

  const isConditionFulfilled = useResponsiveCondition(condition)
  const current = useCurrentBreakpoint()

  const renderContent = () => {
    if (!isConditionFulfilled) return null

    if (ComponentToRender) {
      return <ComponentToRender breakpoint={current} />
    }

    if (render) {
      return render(current)
    }

    return children
  }

  return (
    <>
      {renderContent()}
    </>
  )
}

export default Responsive
