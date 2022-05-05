import {ICollapsed} from  './public'
export interface INavBarItem {
  grade: number
  id: number
  key: string
  pagepermisson: number
  title: string
  children?:INavBarItem[]
}

export interface IProps extends ICollapsed{
  navBar:INavBarItem[]
}