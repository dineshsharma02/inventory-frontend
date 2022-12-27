import React, { FC } from 'react'
import {Form,Input, Button} from 'antd'
import {Link} from 'react-router-dom'
import { DataProps } from '../utils/types'


interface AuthComponentProps {
    titleText ?: string
    isPassword ?: boolean
    bottomText?: string
    linkText?:string
    linkPath?:string
    onSubmit: (values: DataProps) => void
    loading?: boolean
    isUpdatePassword?: boolean
}


const AuthComponent:FC<AuthComponentProps> =  ({
    titleText = "Sign In",
    isPassword = true,
    bottomText = "Login",
    linkText = "New User?",
    linkPath = "/check-user",
    onSubmit,
    loading = false,
    isUpdatePassword = false,


}) => {

  // const onSubmit = (values:any) => {
  //   console.log({values});
    
  // }

  return (
    <div className="login">
        <div className="inner">
            <div className="header">
                <h3>{titleText}</h3>
                <h2>Inventory</h2>
            </div>

    
    <Form layout = "vertical" autoComplete='off' onFinish={onSubmit}>
      
      {
        !isUpdatePassword && <Form.Item 
        label="Email"
        name = "email"
        rules={[{required:true, message: "Please input your email"}]}>
        <Input placeholder="abc@gmail.com" type='email'/>
      </Form.Item>
      }


      {isPassword && <Form.Item 
        label="Password" 
        name="password"
        rules={[{required:true, message: "Please input your password"}]}>
        <Input placeholder="password" type='password' />
      </Form.Item>}

      {isUpdatePassword && <Form.Item 
        label="Confirm Password" 
        name="cpassword"
        rules={[{required:true, message: "Please input your password confirmation"}]}>
        <Input placeholder="Confirm password" type='password' />
      </Form.Item>}
      
      <Form.Item>
        <Button htmlType='submit' type="primary" block loading={loading}>{bottomText}</Button>
      </Form.Item>

    </Form>
    <Link to = {linkPath}>{linkText}</Link>

        </div>
    </div>

  )
}

export default AuthComponent