import axios from 'axios'

import {
  FETCH_SYMBOLS_BEGIN,
  FETCH_SYMBOLS_SUCCESS,
  FETCH_SYMBOLS_FAILURE,
  LIST_SYMBOLS
} from '../actionTypes/symbolsType'

import { symbolsKeyMatch } from '../constants/alphaVantage'

export const fetchSymbolsBegin = loadingStatus => ({
  type: FETCH_SYMBOLS_BEGIN,
  loadingStatus
})

export const fetchSymbolsSuccess = () => ({
  type: FETCH_SYMBOLS_SUCCESS
})

export const fetchSymbolsFailure = errors => ({
  type: FETCH_SYMBOLS_FAILURE,
  errors
})

export const updateSymbols = ({ allIds, byIds }) => ({
  type: LIST_SYMBOLS,
  data: {
    allIds,
    byIds
  }
})

export const searchSymbol = searchTerm => {
  return async dispatch => {
    dispatch(fetchSymbolsBegin())

    try {
      const symbolsData = await axios
        .get('https://www.alphavantage.co/query', {
          params: {
            function: 'SYMBOL_SEARCH',
            keywords: searchTerm,
            apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
          }
        })
        .then(res => res.data)

      if (symbolsData['Error Message']) {
        return dispatch(
          fetchSymbolsFailure([`An error has occured with search.`])
        )
      }

      if (symbolsData.Information) {
        return dispatch(
          fetchSymbolsFailure([
            'API call volume exceeded. Please try again later.'
          ])
        )
      }

      const [bestMatches] = Object.keys(symbolsData)
      const { [bestMatches]: results } = symbolsData

      const allIds = results.map(item => {
        return item[symbolsKeyMatch.symbol]
      })

      const byIds = results.reduce(
        (accu, item) => ({
          ...accu,
          [item[symbolsKeyMatch.symbol]]: {
            symbol: item[symbolsKeyMatch.symbol],
            name: item[symbolsKeyMatch.name],
            type: item[symbolsKeyMatch.type],
            region: item[symbolsKeyMatch.region],
            marketOpen: item[symbolsKeyMatch.marketOpen],
            marketClose: item[symbolsKeyMatch.marketClose],
            timeZone: item[symbolsKeyMatch.timeZone],
            currency: item[symbolsKeyMatch.currency],
            matchScore: item[symbolsKeyMatch.matchScore]
          }
        }),
        {}
      )

      dispatch(updateSymbols({ allIds, byIds }))
      dispatch(fetchSymbolsSuccess())
    } catch (error) {
      dispatch(fetchSymbolsFailure())
    }
  }
}
