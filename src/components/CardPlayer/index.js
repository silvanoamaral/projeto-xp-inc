import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { normalizeURL } from '../../utils/normalizeURL'

import './CardPlayer.scss'

const CardPlayer = props => {
  return <div className="card">
    <h3>{`Resultado encontrados para "${props.query}"`}</h3>
    <ul>
      {props.data.items.map(item => {
      return <li key={`${item.name} -${Math.random()}`} onClick={() => props.onClick(item.id, item.name)}>
        <Link to={`/albums/${normalizeURL(props.search, props.query)}`}
          data-url={item.uri}
        >
          <div><img src={item.images[0].url} alt={item.name} /></div>
          <p>{item.name}</p>
        </Link>
      </li>
    })}
    </ul>
  </div>
}

export default CardPlayer

CardPlayer.propTypes = {
  query: PropTypes.string,
  search: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func
}