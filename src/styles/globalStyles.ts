// src/styles/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito :wght@600;700&family=Roboto:wght@400;500;700&family=Satisfy&display=swap');

  html {
    font-family: 'Roboto', sans-serif;
    background-color: #f9f9f9;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Satisfy', cursive;
    font-weight: normal;
  }

  .score-text {
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .hint-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  .button-text {
    font-family: 'Nunito', sans-serif;
    text-transform: uppercase;
  }
`;