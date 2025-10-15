import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider} from './context/ThemeContext'
import './index.css'
import App from './App'

let root=createRoot(document.getElementById('root'))
if(root){
    root.render(
      <StrictMode>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </StrictMode>
    )
}
else{
  console.log("root element not found")
}

