import React from 'react'

import Grid from '../components/Grid'
import Axis from '../components/Axis'
// import * as GridLines from '../components/GridLines'
import Symbol from '../components/Symbol'

import { GraphSettings } from '../Context'

import { aggregateNaturalAxisLimits, getAxisLimits } from '../utils/data'

export default class OHCL extends React.Component {
  render() {
    const { props } = this

    const { max: maxY, min: minY } = aggregateNaturalAxisLimits(
      Object.values(props.dataSource)
    )

    const {
      lowerLimit: lowerLimitY,
      upperLimit: upperLimitY,
      tick: tickY
    } = getAxisLimits({ max: maxY, min: minY })

    const { lowerLimitX, upperLimitX, tickX } = {
      lowerLimitX: -1,
      upperLimitX: props.dataSource.length,
      tickX: 1
    }

    // console.log({ lowerLimit, upperLimit, tick })

    // const ratio = {
    //   y: (yLimits.ceiling - yLimits.floor) / scale.y
    // }

    // const ratio = {
    //   y:
    // }
    console.log({
      lowerLimitY,
      upperLimitY,
      tickY,
      lowerLimitX,
      upperLimitX,
      tickX
    })

    return (
      <GraphSettings.Provider
        value={{
          chartDomainX: 1000,
          chartDomainY: 400,
          paddingX: 70,
          paddingY: 50,
          lowerLimitY,
          upperLimitY,
          tickY,
          lowerLimitX,
          upperLimitX,
          tickX
        }}
      >
        <Grid>
          <Axis />
          {/* <GridLines.X /> */}
          {props.dataSource.map((serie, index) => {
            return (
              <Symbol
                x1={index}
                x2={index}
                y1={serie.low}
                y2={serie.high}
                open={serie.open}
                close={serie.close}
                onClick={() => console.log(serie)}
                key={JSON.stringify(serie)}
              />
            )
          })}
        </Grid>
      </GraphSettings.Provider>
    )
  }
}
