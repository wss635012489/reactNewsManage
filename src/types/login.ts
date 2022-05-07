import {IUserItem} from './user'
import {IRoleListItem} from './role'
export interface ILocaUser extends IUserItem  {
  role:IRoleListItem
}