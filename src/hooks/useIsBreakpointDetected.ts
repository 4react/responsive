import useCurrentBreakpoint from './useCurrentBreakpoint'

const useIsBreakpointDetected = () => {
  const current = useCurrentBreakpoint()
  return !!current
}

export default useIsBreakpointDetected
