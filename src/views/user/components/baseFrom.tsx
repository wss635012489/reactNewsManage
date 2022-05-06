import React, { forwardRef ,useEffect,useState} from 'react'
import {Form,Input,Select} from 'antd'
import { FormInstance } from 'antd/es/form';
import {IRegionItem,IUserItem} from '@t/user'
import {IRoleListItem} from '@t/role'

const {Option} = Select

interface IProps {
  regionList:IRegionItem[]
  roleList:IRoleListItem[]
  editData:IUserItem | null
}

const baseFrom = forwardRef((props:IProps,ref:React.RefObject<FormInstance>) => {
  const [isDisabled, setisDisabled] = useState<boolean>(false)
  useEffect(() => {
    if(props.editData && !props.editData.region){
      setisDisabled(true)
    }else {
      setisDisabled(false)
    }
  },[props.editData])
  return (
    <Form
      ref={ref}
      layout="vertical"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' },{ min:2,max:8, message: '用户名长度为2到8位' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' },{ min:4, message: '密码长度至少4为' }]}
      >
        <Input type={'password'}/>
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <Select onChange={(value)=>{
                     //console.log(value)
                    if(value == 1){
                      setisDisabled(true)
                        ref.current.setFieldsValue({
                            region:""
                        })
                    }else{
                      setisDisabled(false)
                    }
                }}>
                    {
                        props.roleList.map(item =>
                            <Option value={item.id} key={item.id}>{item.roleName}</Option>
                        )
                    }
                </Select>
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={isDisabled?[]:[{ required: true, message: '请选择区域' }]}
      >
        <Select disabled={isDisabled}>
            {
                props.regionList.map(item =>
                    <Option value={item.value} key={item.id}>{item.title}</Option>
                )
            }
        </Select>
      </Form.Item>
    </Form>
  )
})
export default baseFrom