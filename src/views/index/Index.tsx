import React from 'react'
import styled from './scss/index.module.scss'
import { Layout } from 'antd';
import NavBar from './components/NavBar';
import TopHeader from './components/TopHeader';
const { Content } = Layout;

export default function Index() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar></NavBar>
      <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content style={{ margin: '15px' }}>
            <div className={styled.content}>
                  11111111111
            </div>
          </Content>
        </Layout>
      </Layout>
  )
}
