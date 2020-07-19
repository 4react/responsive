import React from 'react'
import styled from 'styled-components'
import useCurrentBreakpoint from '../../src/hooks/useCurrentBreakpoint'
import useResponsive from '../../src/hooks/useResponsive'

const Container = styled.div`
  height: 100px;
  background-color: #faa;
`

const UseResponsiveStory = () => {
  const breakpoint = useCurrentBreakpoint()
  const responsive = useResponsive()
  const width = responsive(['100%', 380, 650])
  return (
    <Container style={{ width }}>
      {breakpoint} - {width}
    </Container>
  )
}

export default UseResponsiveStory
