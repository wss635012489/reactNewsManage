import React, { Component, useEffect, useState } from 'react';
import {toJS} from 'mobx'
import {inject,observer,Observer} from 'mobx-react'
import {HashRouter as Router, Route,Redirect,Switch} from 'react-router-dom'
import {IStore} from '@t/store'
import notFindPage from '@v/404/notFindPage'
import Home from '@v/home/Index'
import AuthList from '@v/auth/List'
import RoleList from '@v/role/List'
import UserList from '@v/user/List'
import {getAllNavBar} from '@h/api'
import {INavBarItem} from '@t/navBar'
import {ILocaUser} from '@t/login'

interface IProps {
  store?:IStore
}
const routeComponentMap = {
  '/home':Home,
  '/right-manage/right/list':AuthList,
  '/right-manage/role/list':RoleList,
  '/user-manage/list':UserList
}

function Content(props:IProps) {
   //console.log(props)
   const user:ILocaUser  = JSON.parse(localStorage.getItem('token'))
   //console.log(user)
   const [userRouteList,setUserRouteList] = useState<INavBarItem[]>([])
   useEffect(() => {
    getAllNavBar().then((res:any) => {
     // console.log(res)
     var allRouteList = [...res[0],...res[1]]
    // console.log(allRouteList)
     var filterRouteList = []
     for(var item of allRouteList){
       if(item.pagepermisson && routeComponentMap[item.key] && user.role.rights.includes(item.key)){
        filterRouteList.push(item)
       }
     }
     console.log(filterRouteList)
     setUserRouteList(filterRouteList)
    })
   },[])
  return (
    <div style={{height:'100%',width:'100%',overflowY:'auto',paddingRight:'10px'}}>
      <Router>
        <Switch>
          {
            userRouteList.map(item => {
              return <Route path={item.key} component={routeComponentMap[item.key]} key={item.key}></Route>
            })
          }
          
          {userRouteList.length && <Redirect from='/' to={userRouteList[0].key} exact></Redirect>}
          <Route path="*" component={notFindPage}></Route>
        </Switch>
        </Router>
     </div>
  )
}
export default inject('store')(observer(Content))