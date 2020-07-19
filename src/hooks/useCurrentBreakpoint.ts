import { useContext } from 'react'
import ResponsiveContext from '../core/context/ResponsiveContext'

const useCurrentBreakpoint = () => {
  const { current } = useContext(ResponsiveContext)
  return current
}

export default useCurrentBreakpoint
