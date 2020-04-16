import React from 'react'
import { Link } from 'react-router-dom'

import { normalizeURL } from '../../utils/normalizeURL'

import './CardPlayer.scss'

const CardPlayer = props => {
  return <ul className="card">
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
}

export default CardPlayer