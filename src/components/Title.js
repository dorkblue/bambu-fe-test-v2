import React from 'react'
import styled from 'styled-components'

const Title = styled(
  ({ title, subTitle, className }) =>
    (title || subTitle) && (
      <div className={className}>
        <h2>{title}</h2>
        <span>{subTitle}</span>
      </div>
    )
)`
  margin: 1rem 0;

  h2 {
    color: #e0a445;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  span {
    font-weight: 400;
    font-style: italic;
  }
`

Title.defaultProps = {
  title: '',
  subTitle: ''
}

export default Title
