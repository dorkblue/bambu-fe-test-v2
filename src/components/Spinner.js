import React from 'react'
import styled, { keyframes } from 'styled-components'

const donutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  /* position: absolute; */
  /* top: 50%;
  left: 50%; */
  transform: translate(-50% -50%);
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: ${donutSpin} 1.2s linear infinite;
  z-index: 999;
`
export default Spinner
