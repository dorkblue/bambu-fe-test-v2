import React from 'react'
import styled from 'styled-components'

const List = ({ dataSource, ...rest }) => {
  return (
    <Ul>
      {dataSource.map(data => (
        <Li key={data.name} onClick={data.onClick}>
          {data.name}
        </Li>
      ))}
    </Ul>
  )
}

const Ul = styled.ul``

const Li = styled.li``

export default List
