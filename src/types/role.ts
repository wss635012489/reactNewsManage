export interface IRoleListItem {
  id: number
  rights:string[]
  roleType: number
  roleName:string
}

export interface ITree {
  key: string
  title: string
  children?:ITree[]
}