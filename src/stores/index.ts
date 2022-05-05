import { IStore} from '@t/store'
import {observable,action,runInAction,makeObservable} from 'mobx'
import {getNavBarData} from '@h/api'
import {INavBarItem} from '@t/navBar'

//mobx.configure({ enforceActions: "observed"}) 

class store implements IStore {
  constructor() {
    makeObservable(this)
  }
  @observable navBar = []

  @action.bound setNavBar(){
    getNavBarData<{},INavBarItem[]>().then((arr:INavBarItem[]) => {
      //console.log(arr)
      runInAction(() => {
        this.navBar = arr
      })
    })
  }
}

export default new store()