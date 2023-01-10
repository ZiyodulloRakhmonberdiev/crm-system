import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'))


if (process.env.NODE_ENV === "production") {
  console.log = () => {}
  console.error = () => {}
  console.info = () => {}
  console.warn = () => {}
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
)
