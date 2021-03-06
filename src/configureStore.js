import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const configureStore = () => {
  const store = createStore(rootReducer, {}, applyMiddleware(thunk))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  // const unsubscribe = store.subscribe(() =>
  //   console.log({ store: store.getState() })
  // )
  return store
}

export default configureStore
