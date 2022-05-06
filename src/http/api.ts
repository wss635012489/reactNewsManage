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