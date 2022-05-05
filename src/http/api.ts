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