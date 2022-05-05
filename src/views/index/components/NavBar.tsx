import React, { useEffect, useState } from 'react'
import { Layout, Menu,MenuProps  } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';
import {INavBarItem} from '@t/navBar'
import { useHistory, useLocation } from 'react-router-dom';
import styled from '../scss/navBar.module.scss'
import {IProps} from '@t/navBar'

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | ''
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


export default function NavBar({collapsed,navBar}:IProps) {
    const history = useHistory()
    const location = useLocation()
    //console.log(location)
    const [list,setList] = useState<MenuItem[]>([])
    useEffect(() => {
     // console.log(navBar)
      renderMenu(navBar)
    },[navBar])

    const renderMenu = (arr:INavBarItem[]) => {
      const items: MenuItem[] = []
      for(var i in arr){
        var children:MenuItem[] = []
        if(arr[i].children?.length){
          for(var j in arr[i].children){
            arr[i].children[j].pagepermisson && children.push(getItem(arr[i].children[j].title,arr[i].children[j].key,<PieChartOutlined />))
          }
        }
        arr[i].pagepermisson && items.push(getItem(arr[i].title,arr[i].key,<PieChartOutlined />,children.length?children:''))
      }
     // console.log(items)
      setList(items)
    }
    const onMenuClick = (item) => {
     // console.log(item)
      history.push(item.key)
    }
   
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styled.box}>
        { !collapsed && <div className='logo' >全球新闻发布管理系统</div>}
        <div className='menu-List'>
          <Menu theme="dark" selectedKeys={[location.pathname]} defaultOpenKeys={['/' + location.pathname.split('/')[1]]} mode="inline" items={list} onClick={onMenuClick}/>
        </div>
      </div>
    </Sider>
  )
}
