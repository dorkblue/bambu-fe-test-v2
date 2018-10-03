import React from 'react'
import styled from 'styled-components'
import { GraphSettings } from '../Context'

import * as maths from '../utils/math'

export const Y = ({ labels }) => (
  <GraphSettings.Consumer>
    {({ upperLimitY, lowerLimitY, tickY, chartDomainY }) => {
      const fontSize = 15

      const ratioY = maths.ratio(upperLimitY - lowerLimitY, chartDomainY)

      return labels.map(({ title, value }, index) => (
        <React.Fragment key={`${title}-${index}`}>
          <g
            style={{ fontSize, textAnchor: 'end' }}
            transform={`translate(-20, 0)`}
          >
            <title>Y Axis Labels</title>
            <text x={0} y={(upperLimitY - value) / ratioY} dy={0.5}>
              {title}
            </text>
          </g>

          <LabelGroup>
            <title>Y Axis Indicators</title>
            <line
              x1={-10}
              x2={0}
              y1={(upperLimitY - value) / ratioY}
              y2={(upperLimitY - value) / ratioY}
            />
          </LabelGroup>
        </React.Fragment>
      ))
    }}
  </GraphSettings.Consumer>
)

export const X = ({ labels = [] }) => (
  <GraphSettings.Consumer>
    {({ upperLimitX, lowerLimitX, chartDomainX, chartDomainY, tickX }) => {
      const fontSize = 15

      const ratio = maths.ratio(upperLimitX - lowerLimitX, chartDomainX)

      return labels.map(({ title, value }, index) => (
        <g key={`${title}-${index}`}>
          <g
            style={{ fontSize, textAnchor: 'middle' }}
            transform={`translate(${tickX / ratio}, 20)`}
          >
            <title>X Axis Labels</title>
            <text x={value / ratio} y={chartDomainY} dy={0.5}>
              {title}
            </text>
          </g>

          <LabelGroup transform={`translate(${tickX / ratio}, 0)`}>
            <title>Y Axis Indicators</title>
            <line
              x1={value / ratio}
              x2={value / ratio}
              y1={chartDomainY}
              y2={chartDomainY + 5}
            />
          </LabelGroup>
        </g>
      ))
    }}
  </GraphSettings.Consumer>
)

const LabelGroup = styled.g`
  /* font-size: 1px;
  text-anchor: end; */
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 2;
`
