import React from 'react'
import styled from 'styled-components'

const Alert = ({ type, messages }) =>
  messages.length !== 0 ? (
    type === 'error' ? (
      <Error>
        <ul>
          {messages.map((msg, index) => (
            <li key={`${msg}-${index}`}>{msg}</li>
          ))}
        </ul>
      </Error>
    ) : (
      <div />
    )
  ) : null

const Error = styled.div`
  border: 0;
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);

  width: 100%;
  color: #d8000c;
  background-color: #ffbaba;
  margin: 1rem 0;
`

Alert.defaultProps = {
  type: 'error',
  messages: []
}

export default Alert
