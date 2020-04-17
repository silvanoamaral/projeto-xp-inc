import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../view/Home'
import AlbumScreen from '../view/AlbumScreen'
import NotFound from '../view/NotFound'
import Callback from '../view/Callback'

export default () => (
  <>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/callback" exact component={Callback} />
      <Route path="/albums/:playlist" exact component={AlbumScreen} />
      <Route path="*" component={NotFound} />
    </Switch>
  </>
)
