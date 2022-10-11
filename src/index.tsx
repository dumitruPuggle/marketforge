import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import "./index.css";
import { initializeApp } from "firebase/app";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import '@blueprintjs/core/lib/css/blueprint.css';
import "./i18next.ts";
import { firebaseConfig } from "./constant/firebaseConfig";

const theme = createTheme({
  typography: {
    fontFamily: ["Inter"].join(","),
  },
});

 // Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
