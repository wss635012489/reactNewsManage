import {INavBarItem } from './navBar'
export interface IStore {
  navBar:INavBarItem[]
  setNavBar:() => void
}