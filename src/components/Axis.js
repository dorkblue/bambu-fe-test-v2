import React from 'react'
import styled from 'styled-components'

import { GraphSettings } from '../Context'

import { fillRange } from '../utils/data'
import * as maths from '../utils/math'

const Axis = () => (
  <GraphSettings.Consumer>
    {({ lowerLimitY, upperLimitY, scaleY, tickY }) => {
      const labels = fillRange({
        lowerLimit: lowerLimitY,
        upperLimit: upperLimitY,
        tick: tickY
      })

      // console.log({ lowerLimitY, upperLimitY, scaleY, tickY })

      // console.log({ labels })

      const ratio = maths.ratio(upperLimitY - lowerLimitY, scaleY)

      // console.log({ ratio })

      return (
        <React.Fragment>
          {labels.map((label, index) => (
            <React.Fragment key={`${label}-${index}`}>
              <g style={{ fontSize: '1px', textAnchor: 'end' }}>
                <text x={-0.5} y={(upperLimitY - label) / ratio} dy={0.5}>
                  {label}
                </text>
              </g>

              <LabelGroup>
                <line
                  x1={-0.35}
                  x2={0}
                  y1={(upperLimitY - label) / ratio}
                  y2={(upperLimitY - label) / ratio}
                />
              </LabelGroup>
            </React.Fragment>
          ))}

          <g
            style={{
              stroke: '#ccc',
              strokeDasharray: 0,
              strokeWidth: 0.2
            }}
          >
            <line x1={0} x2={0} y1={0} y2={'100%'} />
            <line x1={0} x2={'100%'} y1={'100%'} y2={'100%'} />
          </g>
        </React.Fragment>
      )
    }}
  </GraphSettings.Consumer>
)

const LabelGroup = styled.g`
  /* font-size: 1px;
  text-anchor: end; */
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 0.2;
`

export default Axis
