import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { searchReducer, setIdPlayListReducer } from '../../redux/actions'
import CardPlayer from '../../components/CardPlayer'

import './SearchPlayList.scss'

const SearchPlayList = props => {
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState('')

  const {
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
    <form onSubmit={handleSubmit(onSubmit)} className="search__form">
      <h3>Busque por artistas, álbuns ou músicas</h3>
      <input
        type='text'
        placeholder='Comece a escrever'
        name='search'
        ref={register({ required: true })}
      />
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

SearchPlayList.propTypes = {
  searchReducer: PropTypes.func,
  setIdPlayListReducer: PropTypes.func,
  data: PropTypes.object,
  query: PropTypes.string
}