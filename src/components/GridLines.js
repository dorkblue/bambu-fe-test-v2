import React from 'react'
import { GraphSettings } from '../Context'

export const X = () => (
  <GraphSettings.Consumer>
    {({ scaleX }) => (
      <g
        style={{
          stroke: '#ccc',
          // strokeDasharray: '1%',
          strokeWidth: 0.05
        }}
      >
        {Array.from(new Array(scaleX), (i, index) => (
          <line
            x1={index + 1}
            x2={index + 1}
            y1={0}
            y2={'100%'}
            key={`gridLinesX-${index}`}
          />
        ))}
      </g>
    )}
  </GraphSettings.Consumer>
)
