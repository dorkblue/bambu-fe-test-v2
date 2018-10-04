import { combineReducers } from 'redux'

import {
  FETCH_SERIES_BEGIN,
  FETCH_SERIES_SUCCESS,
  FETCH_SERIES_FAILURE,
  UPDATE_SERIES,
  UPDATE_SERIES_METADATA,
  RESET_DATA
} from '../actionTypes/seriesType'

const initialState = {
  data: {
    metaData: {},
    allIds: [],
    byIds: {}
  },
  status: {
    isLoading: false,
    loadMsg: 'Loading Series...'
  },
  errors: []
}

const data = (state = initialState.data, action) => {
  switch (action.type) {
    case UPDATE_SERIES:
      return {
        ...state,
        allIds: action.data.allIds,
        byIds: action.data.byIds
      }
    case UPDATE_SERIES_METADATA:
      return {
        ...state,
        metaData: action.data.metaData
      }

    case RESET_DATA:
      return {
        ...initialState.data
      }
    default:
      return state
  }
}

const status = (state = initialState.status, action) => {
  switch (action.type) {
    case FETCH_SERIES_BEGIN:
      return {
        ...state,
        isLoading: true,
        loadMsg: action.loadMsg
      }

    case FETCH_SERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadMsg: null
      }

    case FETCH_SERIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadMsg: null
      }

    default:
      return state
  }
}

const errors = (state = initialState.errors, action) => {
  switch (action.type) {
    case FETCH_SERIES_BEGIN:
      return []

    case FETCH_SERIES_FAILURE:
      return [...action.errors]

    case RESET_DATA:
      return [...initialState.errors]

    default:
      return state
  }
}

export default combineReducers({
  data,
  status,
  errors
})
