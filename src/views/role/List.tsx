import React, { useEffect, useState } from 'react'
import { Table,Button,Modal,Tree,message} from 'antd';
import {EditOutlined} from '@ant-design/icons'
import {IRoleListItem,ITree} from '@t/role'
import {getRoles,getNavBarData,editRoleItem} from '@h/api'

export default function List() {
  const [dataSource,setDataSource] = useState<IRoleListItem[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
  const [treeData,setTreeData] = useState<ITree[]>([])
  const [curentRights,setCurentRights] = useState<string[]>([])
  const [curentId,setCurentId] = useState<number | null>(null)
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render:(action,item) => {
        return (<div>
          <Button type="primary" icon={<EditOutlined />} onClick={handelTableItem(item)}>
              修改
          </Button>
        </div>)
      }
    },
  ];

  useEffect(() => {
    setLoading(true)
    getRoles<{},IRoleListItem[]>().then((arr:IRoleListItem[]) => {
      setDataSource(arr)
      setLoading(false)
    })
    getNavBarData<{},ITree[]>().then((arr:ITree[]) => {
       setTreeData(arr)
     })
  },[])

  const handelTableItem = (data:IRoleListItem) => {
    return () => {
      console.log(data)
      setCurentRights(data.rights)
      setCurentId(data.id)
      setIsModalVisible(true)
    }
  }
  const handleOk = () => {
    const newDataSoure = dataSource.map(item => {
      if(item.id == curentId){
        return {
          ...item,
          rights:curentRights
        }
      }
      return item
     })
     setDataSource(newDataSoure)
     editRoleItem(curentId,{rights:curentRights})
    setIsModalVisible(false)
    message.success('修改成功');
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onCheck = (data) => {
   setCurentRights(data.checked)
  }
  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}  pagination={false} loading={loading}/>
      <Modal title="权限分配" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
          <Tree
            checkable
            checkStrictly
            onCheck={onCheck}
            checkedKeys={curentRights}
            treeData={treeData}
            height={400}
          />
      </Modal>
    </>
  )
}
