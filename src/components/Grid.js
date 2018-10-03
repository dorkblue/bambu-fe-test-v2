import React from 'react'
import { GraphSettings } from '../Context'

const Grid = ({ children, ...rest }) => (
  <GraphSettings.Consumer>
    {({ chartDomainX, chartDomainY, paddingX, paddingY }) => {
      return (
        <svg
          style={{ border: '1px dotted red' }}
          width={'100%'}
          height={'100%'}
          // preserveAspectRatio={'none'}
          viewBox={`0 0 ${chartDomainX + paddingX * 2} ${chartDomainY +
            paddingY * 2}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform={`translate(${paddingX}, ${paddingY})`}>{children}</g>
        </svg>
      )
    }}
  </GraphSettings.Consumer>
)

export default Grid
