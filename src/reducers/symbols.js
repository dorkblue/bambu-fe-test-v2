import { combineReducers } from 'redux'

import {
  FETCH_SYMBOLS_BEGIN,
  FETCH_SYMBOLS_SUCCESS,
  FETCH_SYMBOLS_FAILURE,
  LIST_SYMBOLS
} from '../actionTypes/symbolsType'

const initialState = {
  data: {
    allIds: [],
    byIds: {}
  },
  status: {
    isLoading: true,
    loadMsg: 'Loading Symbols...'
  },
  errors: []
}

const data = (state = initialState.data, action) => {
  switch (action.type) {
    case LIST_SYMBOLS:
      return {
        ...state,
        allIds: action.data.allIds,
        byIds: action.data.byIds
      }
    default:
      return state
  }
}

const status = (state = initialState.status, action) => {
  switch (action.type) {
    case FETCH_SYMBOLS_BEGIN:
      return {
        ...state,
        isLoading: true,
        loadingStatus: action.loadingStatus
      }

    case FETCH_SYMBOLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: undefined
      }

    case FETCH_SYMBOLS_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadingStatus: undefined
      }

    default:
      return state
  }
}

const errors = (state = initialState.errors, action) => {
  switch (action.type) {
    case FETCH_SYMBOLS_BEGIN:
      return []

    case FETCH_SYMBOLS_FAILURE:
      return [...action.errors]

    default:
      return state
  }
}

export default combineReducers({
  data,
  status,
  errors
})