import React from 'react'
import styled from 'styled-components'

import { GraphSettings } from '../Context'

import * as maths from '../utils/math'

const Symbol = ({ x1, x2, y1, y2, open, close, ...rest }) => (
  <GraphSettings.Consumer>
    {({
      upperLimitY,
      lowerLimitY,
      chartDomainY,
      upperLimitX,
      lowerLimitX,
      chartDomainX,
      tickX,
      paddingX,
      paddingY
    }) => {
      const ratioY = maths.ratio(upperLimitY - lowerLimitY, chartDomainY)

      const ratioX = maths.ratio(upperLimitX - lowerLimitX, chartDomainX)

      const status = open > close ? 'bearish' : 'bullish'

      const mainStrokeWidth = 2.5

      const gap = tickX / ratioX

      return (
        <Trunk
          status={status}
          {...rest}
          strokeWidth={mainStrokeWidth}
          transform={`translate(${tickX / ratioX}, 0)`}
        >
          <Branch strokeWidth={mainStrokeWidth / 1}>
            <line
              x1={x1 / ratioX - gap * 0.48}
              x2={x2 / ratioX + mainStrokeWidth / 2}
              y1={(upperLimitY - open) / ratioY}
              y2={(upperLimitY - open) / ratioY}
            />

            <line
              x1={x1 / ratioX + gap * 0.48}
              x2={x2 / ratioX - mainStrokeWidth / 2}
              y1={(upperLimitY - close) / ratioY}
              y2={(upperLimitY - close) / ratioY}
            />
          </Branch>

          <line
            x1={x1 / ratioX}
            x2={x2 / ratioX}
            y1={(upperLimitY - y1) / ratioY}
            y2={(upperLimitY - y2) / ratioY}
          />
        </Trunk>
      )
    }}
  </GraphSettings.Consumer>
)

const Trunk = styled.g`
  stroke: ${props =>
    (props.status === 'bearish' && '#d8000c') ||
    (props.status === 'bullish' && '#5d872c') ||
    'grey'};
  stroke-dasharray: 0;
`

const Branch = styled.g``

export default Symbol
