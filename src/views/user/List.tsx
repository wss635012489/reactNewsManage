import React, { useEffect, useRef, useState } from 'react'
import { Table,Button,Switch,Modal,message } from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import BaseFrom from './components/baseFrom';
import styled from  './scss/list.module.scss'
import {IUserItem} from '@t/user'
import {IRoleListItem} from '@t/role'
import {IRegionItem} from '@t/user'
import {getUsers,getRoles,getRegions,addUser,deteleUser} from '@h/api'
import { FormInstance } from 'antd/es/form';

export default function List() {
  const fromRef = useRef<FormInstance>()
  const [dataSource,setDataSource] = useState<IUserItem[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
  const [regionList,setRegionList] = useState<IRegionItem[]>([])
  const [roleList,setRoleList] = useState<IRoleListItem[]>([])
   
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '区域',
      dataIndex: 'region',
      render:region => {
        return region?region:'全球'
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:role => {
        return <b>{role.roleName}</b>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render:username => {
        return <b>{username}</b>
      }
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(region,item) => {
        return <Switch checked={region} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render:(item) => {
        return (<div>
          <Button type="primary" danger icon={<DeleteOutlined />} disabled={item.default} onClick={deteleTableItem(item)}>
            删除
          </Button>
          
          <Button type="primary" icon={<EditOutlined />} style={{marginLeft:'10px'}} disabled={item.default}>
              修改
            </Button>
        </div>)
      }
    },
  ];

  const init_user = () => {
    setLoading(true)
    getUsers<{},IUserItem[]>().then((arr:IUserItem[]) => {
    // console.log(arr)
      setDataSource(arr)
      setLoading(false)
    })
  }
  useEffect(() => {
    init_user()
    getRoles<{},IRoleListItem[]>().then((arr:IRoleListItem[]) => {
      //console.log(arr)
      setRoleList(arr)
    })
    getRegions<{},IRegionItem[]>().then((arr:IRegionItem[]) => {
       //console.log(arr)
       setRegionList(arr)
     })
  },[])

  const handleOk = () => {
    fromRef.current.validateFields().then(values => {
      //console.log(values)
      var postData = {
        ...values,
        "roleState": true,
        "default": false,
      }
      addUser(postData).then(res => {
        //console.log(res)
        message.success('新增成功');
        init_user()
      })
    })
    handleCancel()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    fromRef.current.resetFields()
  }

  const deteleTableItem = (item) => {
    return () => {
      Modal.confirm({
        title: '提示',
        content: '确定要删除吗',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          deteleUser(item.id).then(res => {
            //console.log(res)
            message.success('删除成功');
            init_user()
          })
        },
        onCancel(){

        }
      })
    }
  }

  return (
    <div className={styled.box}>
      <div className='btn'>
        <Button type='primary' onClick={() => {setIsModalVisible(true)}}>新增用户</Button>
      </div>
      <div className='table'>
        <div>
          <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} loading={loading}/>
        </div>
      </div>
      <Modal title="权限分配" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
        <BaseFrom ref={fromRef} regionList={regionList} roleList={roleList}></BaseFrom>
      </Modal> 
    </div>
  )
}
