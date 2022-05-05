import React, { Component } from 'react';
import {toJS} from 'mobx'
import {inject,observer} from 'mobx-react'
import {HashRouter as Router, Route,Redirect,Switch} from 'react-router-dom'
import {IStore} from '@t/store'
import notFindPage from '@v/404/notFindPage'
import Home from '@v/home/Index'
import AuthList from '@v/auth/List'


interface IProps {
  store?:IStore
}

@inject('store')
@observer
export default class Content extends Component<IProps,{}> {

  

  componentDidUpdate(){
    
  }

  render() {
    //console.log(toJS(this.props.store))
    return (
      <div style={{height:'100%',width:'100%',overflowY:'auto',paddingRight:'10px'}}>
        <Router>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/right-manage/right/list' component={AuthList}></Route>
          <Redirect from='/' to='/home' exact></Redirect>
          <Route path="*" component={notFindPage}></Route>
        </Switch>
      </Router>
      </div>
    );
  }
}
