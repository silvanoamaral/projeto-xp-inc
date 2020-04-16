import React from 'react'
import { Link } from 'react-router-dom'

import  './NotFound.scss'

const NotFound = () => {
  return <div className="content">
    <div className="not__found">
      <strong>404</strong>
      <p>Page not found. <Link to="/">Voltar</Link></p>
    </div>
  </div>
}

export default NotFound