import React, { useEffect, useState } from 'react'
import { Table,Tag,Button,Popover,Switch,message   } from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {INavBarItem} from '@t/navBar'
import {getNavBarData,editGradOneAuth,editGradTwoAuth} from '@h/api'

export default function List() {
  const [dataSource,setDataSource] = useState<INavBarItem[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:key => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      render:(action,item) => {
        return (<div>
          {/* <Button type="primary" danger icon={<DeleteOutlined />}>
            删除
          </Button> */}
          
          <Popover content={
            <div style={{textAlign:'center'}}>
              <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={item.pagepermisson} onChange={onSwiperChange(item)}/>
            </div>
          } title="页面启停" trigger={item.pagepermisson == undefined?'':'click'}>
            <Button type="primary" icon={<EditOutlined />} disabled={item.pagepermisson == undefined}>
              修改
            </Button>
        </Popover>
        </div>)
      }
    },
  ];

  useEffect(() => {
    setLoading(true)
    getNavBarData<{},INavBarItem[]>().then((arr:INavBarItem[]) => {
     // console.log(arr)
      for(var i in arr){
        if(!arr[i].children.length){
          delete arr[i].children
        }
      }
      setDataSource(arr)
      setLoading(false)
    })
  },[])

  const onSwiperChange = (item) => {
    return () => {
      //console.log(item)
      if(item.grade == 1){
        editGradOneAuth(item.id,{pagepermisson:item.pagepermisson == 1?0:1})
      }else {
        editGradTwoAuth(item.id,{pagepermisson:item.pagepermisson == 1?0:1})
      }
      item.pagepermisson = item.pagepermisson == 1?0:1
      setDataSource([...dataSource])
      message.success('修改成功');
    }
  }
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} loading={loading}/>
  )
}
