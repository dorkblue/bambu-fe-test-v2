import axios from 'axios'
import moment from 'moment'

import {
  FETCH_SERIES_BEGIN,
  FETCH_SERIES_SUCCESS,
  FETCH_SERIES_FAILURE,
  UPDATE_SERIES,
  UPDATE_SERIES_METADATA,
  RESET_DATA
} from '../actionTypes/seriesType'

import { seriesKeyMatch, metaDataKeyMatch } from '../constants/alphaVantage'

export const fetchSeriesBegin = loadMsg => ({
  type: FETCH_SERIES_BEGIN,
  loadMsg
})

export const fetchSeriesSuccess = () => ({
  type: FETCH_SERIES_SUCCESS
})

export const fetchSeriesFailure = (errors = []) => ({
  type: FETCH_SERIES_FAILURE,
  errors
})

export const updateSeries = ({ allIds, byIds }) => ({
  type: UPDATE_SERIES,
  data: {
    allIds,
    byIds
  }
})

export const updateSeriesMetaData = metaData => ({
  type: UPDATE_SERIES_METADATA,
  data: {
    metaData
  }
})

export const resetData = () => ({
  type: RESET_DATA
})

export const fetchSeriesFromApi = SYMBOL => {
  return async dispatch => {
    dispatch(fetchSeriesBegin())

    try {
      const seriesData = await axios
        .get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: SYMBOL,
            apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
          }
        })
        .then(res => res.data)

      console.log({ seriesData })

      if (seriesData['Error Message']) {
        dispatch(resetData())
        return dispatch(
          fetchSeriesFailure([`Series for symbol ${SYMBOL} is unavailable.`])
        )
      }

      if (seriesData.Information) {
        dispatch(resetData())
        return dispatch(
          fetchSeriesFailure([
            'API call volume exceeded. Please try again later.'
          ])
        )
      }

      const [metaDataKey, seriesKey] = Object.keys(seriesData)
      const { [metaDataKey]: metaData, [seriesKey]: timeSeries } = seriesData

      const allIds = Object.keys(timeSeries).sort((a, b) => {
        return moment(a).isBefore(b) ? -1 : 1
      })

      const byIds = Object.entries(timeSeries).reduce(
        (accu, [id, serie]) => ({
          ...accu,
          [id]: {
            id,
            date: id,
            open: +serie[seriesKeyMatch.open],
            high: +serie[seriesKeyMatch.high],
            low: +serie[seriesKeyMatch.low],
            close: +serie[seriesKeyMatch.close],
            volume: +serie[seriesKeyMatch.volume]
          }
        }),
        {}
      )

      const cleanMetaData = {
        info: metaData[metaDataKeyMatch.info],
        symbol: metaData[metaDataKeyMatch.symbol],
        lastRefreshed: metaData[metaDataKeyMatch.lastRefreshed],
        outputSize: metaData[metaDataKeyMatch.outputSize],
        timeZone: metaData[metaDataKeyMatch.timeZone]
      }

      dispatch(updateSeries({ allIds, byIds }))
      dispatch(updateSeriesMetaData(cleanMetaData))
      dispatch(fetchSeriesSuccess())
    } catch (error) {
      dispatch(fetchSeriesFailure())
    }
  }
}
