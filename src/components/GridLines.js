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
            stroke: '#ccc',
            // strokeDasharray: '1%',
            strokeWidth: 1
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
