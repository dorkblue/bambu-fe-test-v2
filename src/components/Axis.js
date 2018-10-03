import React from 'react'
import styled from 'styled-components'

import { GraphSettings } from '../Context'

import { fillRange } from '../utils/data'
import * as maths from '../utils/math'

const Axis = () => (
  <GraphSettings.Consumer>
    {({
      lowerLimitY,
      upperLimitY,
      tickY,
      tickX,
      lowerLimitX,
      upperLimitX,
      paddingX,
      paddingY,
      chartDomainX,
      chartDomainY
    }) => {
      const strokeWidth = 2
      const fontSize = 15

      const labelsY = fillRange({
        lowerLimit: lowerLimitY,
        upperLimit: upperLimitY,
        tick: tickY
      })

      const ratioY = maths.ratio(upperLimitY - lowerLimitY, chartDomainY)

      const labelsX = fillRange({
        lowerLimit: lowerLimitX,
        upperLimit: upperLimitX,
        tick: tickX
      })

      const ratioX = maths.ratio(upperLimitX - lowerLimitX, chartDomainX)

      console.log({ lowerLimitX, upperLimitX, tickX, labelsX, ratioX })

      return (
        <React.Fragment>
          <MainAxis style={{ strokeWidth }}>
            <title>Y Axis</title>
            <line x1={0} x2={0} y1={0} y2={chartDomainY} />
          </MainAxis>
          <MainAxis style={{ strokeWidth }}>
            <title>X Axis</title>
            <line
              x1={0}
              x2={chartDomainX}
              y1={chartDomainY}
              y2={chartDomainY}
            />
          </MainAxis>
          {labelsY.map((label, index) => (
            <React.Fragment key={`${label}-${index}`}>
              <g style={{ fontSize, textAnchor: 'end' }}>
                <title>Y Axis Labels</title>
                <text x={-20} y={(upperLimitY - label) / ratioY} dy={0.5}>
                  {label}
                </text>
              </g>

              <LabelGroup>
                <title>Y Axis Indicators</title>
                <line
                  x1={-10}
                  x2={0}
                  y1={(upperLimitY - label) / ratioY}
                  y2={(upperLimitY - label) / ratioY}
                />
              </LabelGroup>
            </React.Fragment>
          ))}
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
        </React.Fragment>
      )
    }}
  </GraphSettings.Consumer>
)

const MainAxis = styled.g`
  stroke: #ccc;
  strokedasharray: 0;
`

const LabelGroup = styled.g`
  /* font-size: 1px;
  text-anchor: end; */
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 2;
`

export default Axis
