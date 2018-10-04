import React from 'react'
import { GraphSettings } from '../Context'

const Grid = ({ children, ...rest }) => (
  <GraphSettings.Consumer>
    {({ chartDomainX, chartDomainY, paddingX, paddingY }) => {
      return (
        <svg
          width={'100%'}
          viewBox={`0 0 ${chartDomainX + paddingX} ${chartDomainY +
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
