import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import { searchReducer, setIdPlayListReducer } from '../../redux/actions'
import CardPlayer from '../../components/CardPlayer'

import './SearchPlayList.scss'

const SearchPlayList = props => {
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

  const onclickSetId = (id, name) => {
    setIdPlayListReducer(id, name)
  }

  return <>
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
    {data &&
      <CardPlayer
        data={data}
        search={search}
        query={query}
        onClick={onclickSetId}
      />
    }
  </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlayList)