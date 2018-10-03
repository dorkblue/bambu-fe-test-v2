import React from 'react'
import styled from 'styled-components'

import { GraphSettings } from '../Context'

import * as maths from '../utils/math'

const Period = ({ x1, x2, y1, y2, open, close, ...rest }) => (
  <GraphSettings.Consumer>
    {({ upperLimitY, lowerLimitY, scaleY }) => {
      const ratio = maths.ratio(upperLimitY - lowerLimitY, scaleY)
      const status = open > close ? 'bearish' : 'bullish'

      return (
        <Trunk
          status={status}
          {...rest}
        >
          <Branch>
            <line
              x1={x1 + 1 - 0.35}
              x2={x2 + 1}
              y1={(upperLimitY - open) / ratio}
              y2={(upperLimitY - open) / ratio}
            />

            <line
              x1={x1 + 1 + 0.35}
              x2={x2 + 1}
              y1={(upperLimitY - close) / ratio}
              y2={(upperLimitY - close) / ratio}
            />
          </Branch>

          <line
            x1={x1 + 1}
            x2={x2 + 1}
            y1={(upperLimitY - y1) / ratio}
            y2={(upperLimitY - y2) / ratio}
          />
        </Trunk>
      )
    }}
  </GraphSettings.Consumer>
)

const Trunk = styled.g`
  stroke: ${props =>
    (props.status === 'bearish' && 'red') ||
    (props.status === 'bullish' && 'green') ||
    'grey'};
  stroke-dasharray: 0;
  stroke-width: 0.3;
`

const Branch = styled.g`
  stroke-width: 0.2;
`

export default Period
