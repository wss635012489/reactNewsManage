import axios,{AxiosResponse} from 'axios';
import { message} from 'antd';

interface ResponseData<T = any> {
  data:T,
  code:number,
  msg:string
}

const $http = axios.create({
  baseURL:'http://localhost:9000',
  timeout:10000,
  headers:{
      "Content-Type":"application/json;charset=utf-8"
  }
})

$http.interceptors.response.use((response:AxiosResponse<ResponseData>) => {
  //console.log(response)
    if(response.status < 200 && response.status > 299){
     message.error('服务器错误')
    }else {
      return response.data
    }
},(err:any) => {
  console.log('请求报错',err)
  message.error('服务器错误');
})
export default $http