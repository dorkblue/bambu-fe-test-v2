import React from 'react'
import { GraphSettings } from '../Context'

import * as maths from '../utils/math'

export const X = () => (
  <GraphSettings.Consumer>
    {({ upperLimitX, lowerLimitX, chartDomainX, tickX }) => {
      const ratio = maths.ratio(upperLimitX - lowerLimitX, chartDomainX)

      return (
        // <g
        //   style={{
        //     stroke: '#ccc',
        //     // strokeDasharray: '1%',
        //     strokeWidth: 0.05
        //   }}
        // >
        //   {Array.from(new Array(upperLimitX), (i, index) => (
        //     <line
        //       x1={index + 1}
        //       x2={index + 1}
        //       y1={0}
        //       y2={'100%'}
        //       key={`gridLinesX-${index}`}
        //     />
        //   ))}
        // </g>

        <g
          style={{
            stroke: '#ccc',
            // strokeDasharray: '1%',
            strokeWidth: 1
          }}
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
