import React from 'react'

import Routes from '../../routes'
import Footer from '../../common/Footer'
import Header from '../../common/Header'

import '../../assets/css/index.scss'

const App = () => {
  return (<>
    <Header />
    <div className="container">
      <Routes />
    </div>
    <Footer />
  </>)
}

export default App
