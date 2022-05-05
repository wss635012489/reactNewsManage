export interface IRoleListItem {
  id: number
  rights:string[]
  roleType: number
}

export interface ITree {
  key: string
  title: string
  children?:ITree[]
}