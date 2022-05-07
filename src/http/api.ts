 import $http from './request'

export function getNavBarData<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:'/rights?_embed=children',
    method:'get',
    data
  })
}
export function editGradOneAuth<Request,Response>(id:string,data?:Request){
  return $http.request<Request,Response>({
    url:`/rights/${id}`,
    method:'patch',
    data
  })
}
export function editGradTwoAuth<Request,Response>(id:string,data?:Request){
  return $http.request<Request,Response>({
    url:`/children/${id}`,
    method:'patch',
    data
  })
}
export function getRoles<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:'/roles',
    method:'get',
    data
  })
}
export function editRoleItem<Request,Response>(id:number,data?:Request){
  return $http.request<Request,Response>({
    url:`/roles/${id}`,
    method:'patch',
    data
  })
}
export function getUsers<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:`/users?_expand=role`,
    method:'get',
    data
  })
}
export function getRegions<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:`/regions`,
    method:'get',
    data
  })
}
export function addUser<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:`/users`,
    method:'post',
    data
  })
}
export function deteleUser<Request,Response>(id:string){
  return $http.request<Request,Response>({
    url:`/users/${id}`,
    method:'delete',
  })
}
export function setUserRoleState<Request,Response>(id:number,data?:Request){
  return $http.request<Request,Response>({
    url:`/users/${id}`,
    method:'patch',
    data
  })
}
export function editUser<Request,Response>(id:number,data?:Request){
  return $http.request<Request,Response>({
    url:`/users/${id}`,
    method:'patch',
    data
  })
}
export function login<Request,Response>(data?:Request){
  return $http.request<Request,Response>({
    url:`/users`,
    method:'get',
    params:data
  })
}
export function getAllNavBar(){
  const p1 = $http.request({
    url:`/rights`,
    method:'get',
  })
  const p2 = $http.request({
    url:`/children`,
    method:'get',
  })
  return Promise.all([p1,p2])
}