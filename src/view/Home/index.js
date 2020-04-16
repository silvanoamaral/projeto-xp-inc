import React from 'react'
import { connect } from 'react-redux'

import SearchPlayList from '../SearchPlayList'
import LoginButton from '../../components/LoginButton'

const Home = props => {
  return <div className='content'>
    {props.expires && (
      <LoginButton
        expires={props.expires}
        text={props.text}
      />
    )}

    {!props.expires && (
      <SearchPlayList />      
    )}
  </div>
}

const mapStateToProps = store => ({
  expires: store.searchReducer.expires,
  text: store.searchReducer.text
})

export default connect(mapStateToProps)(Home)