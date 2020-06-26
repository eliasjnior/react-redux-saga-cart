import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    --webkit-font-smoothing: antialised;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }
`
