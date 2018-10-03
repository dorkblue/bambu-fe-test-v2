import React from 'react'
import moment from 'moment'

import Grid from '../components/Grid'
import * as Axis from '../components/Axis'
import * as AxisLabels from '../components/AxisLabels'
import * as GridLines from '../components/GridLines'
import Symbol from '../components/Symbol'

import { GraphSettings } from '../Context'

import {
  aggregateNaturalAxisLimits,
  getAxisLimits,
  fillRange
} from '../utils/data'

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

    const labelsYCoordinates = fillRange({
      lowerLimit: lowerLimitY,
      upperLimit: upperLimitY,
      tick: tickY
    })

    const labelsY = labelsYCoordinates.map(
      coor => ({
        title: `$ ${coor}`,
        value: coor
      }),
      {}
    )

    const labelsXByMonth = props.dataSource.reduce((accu, { date }, index) => {
      const month = moment(date).get('month')

      const isMonthAvailable = !!accu[month]

      if (isMonthAvailable) {
        return moment(accu[month].date).isBefore(date, 'day')
          ? {
              ...accu
            }
          : {
              ...accu,
              [month]: {
                date,
                title: moment(date).format('MMM'),
                value: index
              }
            }
      } else {
        return {
          ...accu,
          [month]: {
            date,
            title: moment(date).format('MMM'),
            value: index
          }
        }
      }
    }, {})

    const labelsX = Object.values(labelsXByMonth)

    // const labelsX = props.dataSource.map(({ date }, index) => console.log(date) || ({
    //   title: `${moment(date).get('date')}`,
    //   value: index
    // }), {})

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
        <div
          style={{
            // maxHeight: '500px',
            width: '100%',
            padding: '1rem'
          }}
        >
          <Grid>
            <GridLines.X />
            <Axis.X />
            <Axis.Y />
            <AxisLabels.Y labels={labelsY} />
            <AxisLabels.X labels={labelsX} />
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
        </div>
      </GraphSettings.Provider>
    )
  }
}
