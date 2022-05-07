import React, { useState } from 'react'
import { Layout,Dropdown,Menu,Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined } from '@ant-design/icons';
import {IProps} from '@t/topHeader'
import { useHistory } from 'react-router-dom';
import {ILocaUser} from '@t/login'

const { Header } = Layout;

export default function TopHeader({setCollapsedFun,collapsed}:IProps) {
  const history = useHistory()
  const onMenuClick = (data) => {
    if(data.key == 2){
      localStorage.removeItem('token')
      history.replace('/login')
    }
  }
  const user:ILocaUser  = JSON.parse(localStorage.getItem('token'))
  console.log(user)
  const menu = (
    <Menu onClick={onMenuClick} items={[
        {
         label: user.role.roleName,
          key:'1',
          disabled: true,
        },
        {
          label: '退出登录',
           danger:true,
           key:'2'
         },
      ]}
    />
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 15px' }} >
      <div className='between'>
       <div>
        {
            collapsed?<MenuFoldOutlined className='font-20' onClick={setCollapsedFun}/>:  <MenuUnfoldOutlined className='font-20' onClick={setCollapsedFun}/>
          }
        </div>
        <div className='y-center'>
          <div className='mr-10'>
            欢迎{user.username}回来
          </div>
          <Dropdown overlay={menu}>
            <Avatar size={40} icon={<UserOutlined />} />
         </Dropdown>
        </div>
      </div>
    </Header>
  )
}
