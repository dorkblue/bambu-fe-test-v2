import { combineReducers } from 'redux'

import symbols from './symbols'
import series from './series'

const rootReducer = combineReducers({ symbols, series })

export default rootReducer
