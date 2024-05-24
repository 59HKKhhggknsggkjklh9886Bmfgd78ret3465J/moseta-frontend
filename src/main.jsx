import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>

      
      {/* For notifications like login successfully */}
      <Toaster    
      position="top-center"
      reverseOrder={true}
      />

        <BrowserRouter>
          <App />
        </BrowserRouter>

    </Provider>
)
