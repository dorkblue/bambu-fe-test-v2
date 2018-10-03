import React from 'react'
import { GraphSettings } from '../Context'

const Grid = ({ children, ...rest }) => (
  <GraphSettings.Consumer>
    {({ scaleX, scaleY }) => (
      <svg
        width={'100%'}
        height={'100%'}
        viewBox={`0 0 ${scaleX} ${scaleY}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    )}
  </GraphSettings.Consumer>
)

export default Grid
