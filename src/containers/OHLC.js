import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import qs from 'qs'

import { fetchSeriesFromApi } from '../actionCreators/seriesAction'

import Grid from '../components/Grid'
import * as Axis from '../components/Axis'
import * as AxisLabels from '../components/AxisLabels'
import * as GridLines from '../components/GridLines'
import Symbol from '../components/Symbol'
import Alert from '../components/Alert'

import { GraphSettings } from '../Context'

import {
  aggregateNaturalAxisLimits,
  getAxisLimits,
  fillRange
} from '../utils/data'
import Title from '../components/Title'
import Spinner from '../components/Spinner'
import defaultSymbols from '../constants/defaultSymbols'

class OHCL extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = async () => {
    if (this.props.location.search) {
      const query = qs.parse(this.props.location.search.replace('?', ''))
      try {
        await this.props.fetchSeriesFromApi(query.symbol)
      } catch (error) {
        throw error
      }
    }
  }

  componentDidUpdate = async prevProps => {
    if (this.props.location.search !== prevProps.location.search) {
      const query = qs.parse(this.props.location.search.replace('?', ''))
      try {
        await this.props.fetchSeriesFromApi(query.symbol)
      } catch (error) {
        throw error
      }
    }
  }

  render() {
    const { props } = this

    const { max: maxY, min: minY } = aggregateNaturalAxisLimits(
      props.dataSource
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
        <Wrapper>
          <TitleContainer>
            {props.seriesLoading && (
              <Spinner
                style={{
                  margin: '1rem'
                }}
              />
            )}

            <Title
              title={props.metaData.symbol}
              subTitle={
                props.symbols.byIds[props.metaData.symbol]
                  ? props.symbols.byIds[props.metaData.symbol].name
                  : defaultSymbols.byIds[props.metaData.symbol]
                    ? defaultSymbols.byIds[props.metaData.symbol].name
                    : ''
              }
            />
          </TitleContainer>

          <Alert type={'error'} messages={props.errors} />
          <div
            className={'graph'}
            style={{
              flex: '1 1 auto'
            }}
          >
            <Grid>
              <GridLines.X />
              <Axis.X />
              <Axis.Y />
              <AxisLabels.X labels={labelsX} />
              <AxisLabels.Y labels={labelsY} />
              {props.dataSource.map((serie, index) => {
                return (
                  <Symbol
                    x1={index}
                    x2={index}
                    y1={serie.low}
                    y2={serie.high}
                    open={serie.open}
                    close={serie.close}
                    // onClick={() => console.log(serie)}
                    key={JSON.stringify(serie)}
                  />
                )
              })}
            </Grid>
          </div>
        </Wrapper>
      </GraphSettings.Provider>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const mapStateToProps = ({ symbols, series }) => ({
  symbols: symbols.data,
  metaData: series.data.metaData,
  dataSource: series.data.allIds.map(id => series.data.byIds[id]),
  seriesLoading: series.status.isLoading,
  errors: series.errors
})

export default connect(
  mapStateToProps,
  { fetchSeriesFromApi }
)(OHCL)
