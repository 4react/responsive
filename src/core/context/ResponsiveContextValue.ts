import Breakpoints from '../model/Breakpoints'

interface ResponsiveContextValue {
  breakpoints: Breakpoints
  current: string,
  validKeys: string[]
}

export default ResponsiveContextValue
