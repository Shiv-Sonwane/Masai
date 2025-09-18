import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from './context/ThemeContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter> 
    </ThemeProvider>
  </StrictMode>
);
