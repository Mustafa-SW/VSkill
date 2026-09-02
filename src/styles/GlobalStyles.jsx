import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #e0eafc, #cfdef3);
    color: #222;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    border: none;
    outline: none;
    font-family: inherit;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    transition: border 0.3s ease;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #6C63FF;
  }

  ::selection {
    background-color: #6C63FF;
    color: #fff;
  }
`;

export default GlobalStyles;
