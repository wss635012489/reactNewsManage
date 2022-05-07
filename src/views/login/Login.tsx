import React,{useCallback} from 'react'
import { Form, Input, Button, message } from 'antd';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import './login.scss'
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";
import {login} from '@h/api'
import {ILocaUser} from '@t/login'
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory()
    const onFinish = (values: any) => {
      console.log('Success:', values);
      login({...values,roleState:true,'_expand':'role'}).then((res:ILocaUser[]) => {
        if(res && res.length){
          localStorage.setItem('token',JSON.stringify(res[0]))
          history.replace('/')
        }else {
          message.error('账号或密码不正确')
        }
      })
    };
    const particlesInit = useCallback((engine: Engine) => {
      return loadFull(engine);
  }, []);

  return (
    <div className='loginWarp'>
        <Particles options={particlesOptions as ISourceOptions} init={particlesInit}/>
        <div className='fromWarp'>
          <div className='title'>
            全球新闻发布管理系统
          </div>
          <Form
            onFinish={onFinish}
            labelAlign="right"
            labelCol={{ span: 4 }}
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
              <Input.Password visibilityToggle={false}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size='large' block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
}
