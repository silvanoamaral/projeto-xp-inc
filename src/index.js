import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import history from './helpers/history'
import store from './redux/store'
import App from './view/App'

ReactDOM.render(
  <Provider store={store} >
    <Router history={ history }>
      <App />
    </Router>
  </Provider>,
document.getElementById('root'))