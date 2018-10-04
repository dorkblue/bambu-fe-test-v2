import React from 'react'
import { GraphSettings } from '../Context'

import * as maths from '../utils/math'
import { fillRange } from '../utils/data'

export const X = () => (
  <GraphSettings.Consumer>
    {({ upperLimitX, lowerLimitX, chartDomainX, tickX, chartDomainY }) => {
      const ratioX = maths.ratio(upperLimitX - lowerLimitX, chartDomainX)
      const labelsX = fillRange({
        lowerLimit: lowerLimitX,
        upperLimit: upperLimitX,
        tick: tickX
      })
      return (
        <g
          style={{
            stroke: 'hsla(0, 0%, 80%, 0.5)',
            // strokeDasharray: '1%',
            strokeWidth: 0.5
          }}
          transform={`translate(${tickX / ratioX}, 0)`}
        >
          <title>X Axis Grid Lines</title>
          {labelsX.map((label, index) => (
            <line
              x1={label / ratioX}
              x2={label / ratioX}
              y1={0}
              y2={chartDomainY}
              key={`gridLinesX-${index}`}
            />
          ))}
        </g>
      )
    }}
  </GraphSettings.Consumer>
)
