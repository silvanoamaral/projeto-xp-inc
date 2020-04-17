import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './BackButton.scss'

const BackButton = props => {
  return <div className='btn__back'>
    <Link to='/' onClick={props.onClick} ><i className='arrow left' />Voltar</Link>
  </div>
}

export default BackButton

BackButton.propTypes = {
  onClick: PropTypes.func,
}