import { useContext } from 'react'
import Breakpoints from '../core/model/Breakpoints'
import ResponsiveContext from '../core/context/ResponsiveContext'

export interface BreakpointConditionRange {
  min?: string
  max?: string
}

export type BreakpointCondition = string | string[] | BreakpointConditionRange

const parseConditionTargets = (condition: BreakpointCondition, breakpoints: Breakpoints): string[] => {
  if (typeof condition === 'object') {
    const range = condition as BreakpointConditionRange
    const startIndex = range.min
      ? breakpoints.indexOf(range.min)
      : 0
    const endIndex = range.max
      ? breakpoints.indexOf(range.max)
      : breakpoints.keys.length - 1

    return breakpoints.keys.slice(startIndex, endIndex + 1)
  }

  if (Array.isArray(condition)) {
    return condition as string[]
  }

  return [condition as string]
}

const useResponsiveCondition = (condition: BreakpointCondition): boolean => {
  const { breakpoints, current } = useContext(ResponsiveContext)
  if (!current) return false
  const targets: string[] = parseConditionTargets(condition, breakpoints)

  return targets.includes(current)
}

export default useResponsiveCondition
