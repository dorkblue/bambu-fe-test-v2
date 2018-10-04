import React from 'react'
import styled from 'styled-components'

import { GraphSettings } from '../Context'

export const X = () => (
  <GraphSettings.Consumer>
    {({ chartDomainX, chartDomainY }) => {
      const strokeWidth = 2

      return (
        <MainAxis style={{ strokeWidth }}>
          <title>X Axis</title>
          <line x1={0} x2={chartDomainX} y1={chartDomainY} y2={chartDomainY} />
        </MainAxis>
      )
    }}
  </GraphSettings.Consumer>
)

export const Y = () => (
  <GraphSettings.Consumer>
    {({ chartDomainY }) => {
      const strokeWidth = 2

      return (
        <MainAxis style={{ strokeWidth }}>
          <title>Y Axis</title>
          <line x1={0} x2={0} y1={0} y2={chartDomainY} />
        </MainAxis>
      )
    }}
  </GraphSettings.Consumer>
)

const MainAxis = styled.g`
  stroke: hsla(44, 100%, 74%, 1);
  strokedasharray: 0;
`
