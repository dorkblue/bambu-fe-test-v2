import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import OHLC from './containers/OHLC'
import List from './components/List'

class App extends Component {
  state = {
    data: {
      metaData: {},
      allIds: [],
      byIds: {}
    }
  }

  getTimeSeriesDaily = async symbol => {
    try {
      const keyMatch = {
        open: '1. open',
        high: '2. high',
        low: '3. low',
        close: '4. close',
        volume: '5. volume'
      }

      const response = await axios
        .get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol,
            apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
          }
        })
        .then(res => res.data)

      const [metaDataKey, seriesKey] = Object.keys(response)
      const { [metaDataKey]: metaData, [seriesKey]: timeSeries } = response

      const allIds = Object.keys(timeSeries).sort((a, b) => {
        return moment(a).isBefore(b) ? -1 : 1
      })

      const byIds = Object.entries(timeSeries).reduce(
        (accu, [id, serie]) => ({
          ...accu,
          [id]: {
            open: +serie[keyMatch.open],
            high: +serie[keyMatch.high],
            low: +serie[keyMatch.low],
            close: +serie[keyMatch.close],
            volume: +serie[keyMatch.volume]
          }
        }),
        {}
      )

      return {
        metaData,
        allIds,
        byIds
      }
    } catch (error) {
      throw error
    }
  }

  onClick = async symbol => {
    try {
      return this.setState({
        data: await this.getTimeSeriesDaily(symbol)
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  componentDidMount = async () => {
    try {
      return this.setState({
        data: await this.getTimeSeriesDaily('AA')
      })
    } catch (error) {}
  }

  render() {
    console.log(this.state)
    const { state } = this
    const stockOptions = [
      'MSFT',
      'AAPL',
      'INTC',
      'NFLX',
      'ORCL',
      'CMCSA',
      'GOOG',
      'LUV',
      'HOG',
      'GOOGL',
      'AMZN'
    ]

    const listData = stockOptions.map(name => ({
      name,
      key: name,
      onClick: () => this.onClick(name)
    }))

    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <main
          style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}
        >
          <List dataSource={listData} />
          <OHLC
            dataSource={state.data.allIds.map(id => ({
              ...state.data.byIds[id],
              date: id
            }))}
          />
        </main>
      </div>
    )
  }
}

export default App
