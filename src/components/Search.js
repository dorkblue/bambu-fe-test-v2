import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { searchSymbol } from '../actionCreators/symbolsAction'

const Search = ({ searchSymbol }) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder={'Search and enter'}
          onKeyPress={e => {
            e.key === 'Enter' && searchSymbol(e.target.value)
          }}
        />
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const InputWrapper = styled.div`
  /* height: 50px; */
  padding: 1.5rem;
`

const Input = styled.input`
  box-sizing: border-box;

  height: 2.25rem;
  padding: 0 0.75rem;
  border: 0;
  font-size: 0.875rem;
  width: 100%;
  border-radius: 5px;

  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);

  &::placeholder {
    color: #bbb;
  }
`

export default connect(
  null,
  { searchSymbol }
)(Search)
