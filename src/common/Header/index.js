import React from 'react'

import './Header.scss'
import logo from '../../assets/images/logo-spotify.svg'

const Header = () => {
  return <header>
    <div className="container">
      <h1><img src={logo} alt="spotify" /></h1>
    </div>
  </header>
}

export default Header