import {IUserItem} from './user'
import {IRoleListItem} from './role'
export interface ILoginRes extends IUserItem  {
  role:IRoleListItem
}