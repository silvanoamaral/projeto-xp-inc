import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import { searchReducer, setIdPlayListReducer } from '../../redux/actions'

import './SerachPlayList.scss'

const SerachPlayList = props => {
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState('')

  const {
    loading,
    searchReducer,
    data,
    query,
    setIdPlayListReducer
  } = props

  const onSubmit = async (data) => {
    searchReducer(localStorage.getItem('spotifyAuthToken'), data.search)
    setSearch(data.search)
  }

  const normalizeURL = str => {
    if(str) {
      return str.replace(/\s+/g, '-').toLowerCase()
    } else {
      return query.replace(/\s+/g, '-').toLowerCase()
    }
  }

  const onclickSetId = (id, name) => {
    setIdPlayListReducer(id, name)
  }

  return <div className=''>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Spotify Player Will Go Here In the Next Step</h3>
      <input
        type='text'
        placeholder='Busque por artistas, álbuns ou músicas'
        name='search'
        ref={register({ required: true })}
      />
      <input type='submit' value={loading ? 'Buscando...' : 'Enviar'} />
    </form>
    {data && <ul>
      {data.items.map(item => {
        return <li key={`${item.name} -${Math.random()}`} onClick={() => onclickSetId(item.id, item.name)}>
          <Link to={`/albums/${normalizeURL(search)}`}
            data-url={item.uri}
          >
            <img src={item.images[0].url} alt={item.name} />
            <p>{item.name}</p>
          </Link>
        </li>
      })
      }
    </ul>
    }
  </div>
}

const mapStateToProps = store => ({
  loading: store.searchReducer.loading,
  data: store.searchReducer.data,
  query: store.searchReducer.query
})

const mapDispatchToProps = {
  searchReducer,
  setIdPlayListReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(SerachPlayList)