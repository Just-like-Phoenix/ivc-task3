import { ThemeProvider, createGlobalStyle } from "styled-components";
import { backgroundColor } from "./theme";
import { useThemeChecker } from "../hoks/useThemeChecker";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const GlobalStyle = createGlobalStyle`
  body {    
    background-color: ${backgroundColor};
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={{ mode: useThemeChecker() }}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
