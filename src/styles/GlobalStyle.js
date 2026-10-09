import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: #e6676b;
    background: #fff8f2;
  }
  button, input { font: inherit; }
  button { cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  :focus-visible { outline: 3px solid #8c3b40; outline-offset: 2px; }
`
