import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import styled from 'styled-components'

import configureStore from './configureStore'

import OHLC from './containers/OHLC'
import Sidebar from './containers/Sidebar'
import Search from './components/Search';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppWrapper>
            <header>
              <h1>
                <span>OHLC</span> Chart
              </h1>
            </header>
            <main>
              <div className={'sidebar'}>
                <Search />
                <Sidebar />
              </div>
              <div className={'content'}>
                <Switch>
                  <Route exact path="/" component={OHLC} />
                </Switch>
              </div>
            </main>
          </AppWrapper>
        </BrowserRouter>
      </Provider>
    )
  }
}

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    position: relative;
    flex: 0 1 auto;
    padding: 0.5rem 1rem;
    background-color: #212121;

    h1 {
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
      span {
        color: #e0a445;
      }
    }
  }

  main {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: stretch;
    background-color: whitesmoke;

    .sidebar {
      flex: 0 1 220px;
    }

    .content {
      position: relative;
      flex: 1 1 auto;
      background-color: white;
    }
  }

  footer {
    position: relative;
    flex: 0 1 auto;
    padding: 0.5rem 1rem;
  }
`

export default App
