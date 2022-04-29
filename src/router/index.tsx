import React from 'react'
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'
import Login from '@v/login/Login'
import Index from '@v/index/Index'

export default function index() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" render={() => {
          return localStorage.getItem('token')? <Index></Index>:<Redirect to="/login"></Redirect>
        }}></Route>
      </Switch>
    </HashRouter>
  )
}
