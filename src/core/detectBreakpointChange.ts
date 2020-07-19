import watchMedia from './watchMedia'
import Breakpoints from './model/Breakpoints'

const detectBreakpointChange = (breakpoints: Breakpoints, onChange: (key: string) => void) => {
  breakpoints.keys.forEach((key, index) => {
    const nextKey = breakpoints.keys[index + 1]
    const min = breakpoints.valueOf(key)
    const max = nextKey ? breakpoints.valueOf(nextKey) - 1 : undefined

    const mql = watchMedia(min, max)
    mql.addEventListener('change', (e: MediaQueryListEvent) => {
      if (e.matches) {
        onChange(key)
      }
    })
    if (mql.matches) {
      onChange(key)
    }
  })
}

export default detectBreakpointChange
