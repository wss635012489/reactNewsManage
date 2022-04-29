import React, { useState } from 'react'
import { Layout,Dropdown,Menu,Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

const menu = (
  <Menu items={[
      {
       label: 'admin管理员',
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

export default function TopHeader() {
  const [collapsed,setCollapsed] = useState<boolean>(false)

  const changeCollapsed = () =>{
    setCollapsed(!collapsed)
  }
  return (
    <Header className="site-layout-background" style={{ padding: '0 15px' }} >
      <div className='between'>
       <div>
        {
            collapsed?<MenuFoldOutlined className='font-20' onClick={changeCollapsed}/>:  <MenuUnfoldOutlined className='font-20' onClick={changeCollapsed}/>
          }
        </div>
        <div className='y-center'>
          <div className='mr-10'>
            欢迎amin回来
          </div>
          <Dropdown overlay={menu}>
            <Avatar size={40} icon={<UserOutlined />} />
         </Dropdown>
        </div>
      </div>
    </Header>
  )
}
