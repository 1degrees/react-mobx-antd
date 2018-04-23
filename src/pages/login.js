import React, { Component } from 'react'
import {observer, inject} from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, notification} from 'antd';

const FormItem = Form.Item;
@inject('loginStore') @observer
class LoginForm extends React.Component {
  
  checkName = (rule, value, callback) => {
    let reg=/^[\u2E80-\u9FFF]*[a-zA-Z]*$/;//Unicode编码中的汉字范围
    !reg.test(value) ?
      callback( '用户名仅为中文或字母组成') : callback()
  }

  checkPassword = (rule, value, callback) => {
    let reg=/(\d+[a-zA-Z]+)|([a-zA-Z]+\d+)/;//Unicode编码中的汉字范围
    value&&!reg.test(value) ? callback( '密码至少包含字母数字组合') : callback()
  }

  login = (data) => {
    let params = {principal: data.userName, password: data.password}
    this.props.loginStore.login(params).then(rs=>{
      if(rs && rs.data.status == 1){
        notification.open({
          message: '登录-通知',
          description: '登录成功,跳转至列表页.',
        });
        setTimeout(() => {
          this.props.history.push('/list');
        }, 1000);
      } else{
        notification.open({
          message: '登录-通知',
          description: '登录失败,请确实用户名或密码输入是否正确.',
        });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      !err && this.login(values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ 
                      required: true, message: 'Please input your username!' 
                    }, {
                        validator: this.checkName
                    }]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ 
              required: true, message: 'Please input your Password!' 
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住账户</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <a href="">现在注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;