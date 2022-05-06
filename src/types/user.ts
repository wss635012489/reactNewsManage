export interface IUserItem {
  default: boolean
  id: number
  password: number
  region: string
  roleId: number
  roleState: boolean
  username: string
}

export interface IRegionItem {
  id:number
  title:string
  value:string
}