import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import store from './store'
import history from './history'
import { App } from './components'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1cb7ff',
    accent1Color: '#f44336'
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
