import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import qs from 'qs'

const Sidebar = ({ location, symbols }) => {
  const query = qs.parse(location.search.replace('?', ''))

  const defaultOptions = [
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

  const defaultData = defaultOptions.sort().map(symbol => ({
    symbol,
    key: symbol
  }))

  const renderData =
    symbols.allIds.length === 0
      ? defaultData
      : symbols.allIds.map(id => {
          const symbol = symbols.byIds[id]
          return {
            key: id,
            name: symbol.name,
            symbol: symbol.symbol
          }
        })

  return (
    <Wrapper>
      <Ul>
        {renderData.map(data => (
          <li
            key={data.key}
            className={query.symbol === data.symbol ? 'active' : ''}
          >
            <Link
              to={{
                pathname: '/',
                search: `?symbol=${data.symbol}`
              }}
            >
              <Symbol>{data.symbol}</Symbol>
              <Name>{data.name}</Name>
            </Link>
          </li>
        ))}
      </Ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    &:hover {
      transition: background-color 0.5s ease;
      background-color: hsla(44, 100%, 74%, 1);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    a {
      display: block;
      text-decoration: none;
      padding: 1rem 1.5rem;
    }
  }

  li.active {
    background-color: #e0a445;
  }
`

const Symbol = styled.span`
  display: block;
  color: hsla(0, 0%, 13%, 1);
  font-weight: 600;
`

const Name = styled.span`
  color: hsla(0, 0%, 30%, 1);
  display: block;
  font-style: italic;
  font-size: 0.8em;
  font-weight: 400;
`

const mapStateToProps = ({ symbols }) => ({
  symbols: symbols.data,
  symbolsLoading: symbols.status.isLoading
})

export default withRouter(connect(mapStateToProps)(Sidebar))
