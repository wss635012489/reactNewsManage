import React,{Component} from 'react'
import styled from './scss/index.module.scss'
import { Layout } from 'antd';
import NavBar from './components/NavBar';
import TopHeader from './components/TopHeader';
import Body from './components/Content'
import {observer,inject} from 'mobx-react'
import {toJS} from 'mobx'
import {ICollapsed} from '@t/public'
import {IStore} from '@t/store'
import {RouteComponentProps} from 'react-router-dom'
import Nprogress  from 'nprogress'
import 'nprogress/nprogress.css';


const { Content } = Layout;
interface IState extends ICollapsed {
  
}
interface IProps extends RouteComponentProps {
  store?:IStore
}
@inject('store')
@observer
class Index extends Component<IProps,IState> {
    state:IState = {
      collapsed:false
    }
    setCollapsedFun = () => {
      this.setState({
        collapsed:!this.state.collapsed
      })
    }
    
    componentDidMount(){
      Nprogress.start()
      this.props.store.setNavBar()
    }
    componentWillUpdate() {
      Nprogress.start()
    }

    componentDidUpdate(p) {
      Nprogress.done()
    }
    render(){
        return (
            <Layout style={{ height: '100vh' }}>
              <NavBar collapsed={this.state.collapsed} navBar={toJS(this.props.store.navBar)}></NavBar>
              <Layout className="site-layout">
                  <TopHeader setCollapsedFun={this.setCollapsedFun} collapsed={this.state.collapsed}></TopHeader>
                  <Content style={{ margin: '15px' }}>
                    <div className={styled.content}>
                         {toJS(this.props.store.navBar).length &&  <Body></Body>}
                    </div>
                  </Content>
                </Layout>
              </Layout>
          )
    }
}
export default Index