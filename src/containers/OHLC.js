import React from 'react'

import Grid from '../components/Grid'
import Axis from '../components/Axis'
import * as GridLines from '../components/GridLines'
import Period from '../components/Period'

import { GraphSettings } from '../Context'

import { aggregateNaturalAxisLimits, getAxisLimits } from '../utils/data'

export default class OHCL extends React.Component {
  render() {
    const { props } = this

    const { ceiling, floor } = aggregateNaturalAxisLimits(
      Object.values(props.dataSource)
    )

    const { lowerLimit, upperLimit, tick } = getAxisLimits(floor, ceiling)

    // console.log({ lowerLimit, upperLimit, tick })

    // const ratio = {
    //   y: (yLimits.ceiling - yLimits.floor) / scale.y
    // }

    // const ratio = {
    //   y:
    // }

    return (
      <GraphSettings.Provider
        value={{
          scaleX: 101,
          scaleY: 30,
          lowerLimitY: lowerLimit,
          upperLimitY: upperLimit,
          tickY: tick
        }}
      >
        <Grid>
          <Axis />
          <GridLines.X />
          {props.dataSource.map((serie, index) => {
            return (
              <Period
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
