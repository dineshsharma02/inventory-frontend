import React, { FC } from 'react'
import {Form,Input, Button} from 'antd'
import {Link} from 'react-router-dom'

interface AuthComponentProps {
    titleText ?: string,
    isPassword ?: boolean,
    bottomText?: string,
    linkText?:string,
    linkPath?:string
}


const AuthComponent:FC<AuthComponentProps> =  ({
    titleText = "Sign In",
    isPassword = true,
    bottomText = "Login",
    linkText = "New User?",
    linkPath = "/check-user"


}) => {
  return (
    <div className="login">
        <div className="inner">
            <div className="header">
                <h3>{titleText}</h3>
                <h2>Inventory</h2>
            </div>

    
    <Form layout = "vertical">
      
      <Form.Item label="Email">
        <Input placeholder="abc@gmail.com" />
      </Form.Item>

      {isPassword && <Form.Item label="Password">
        <Input placeholder="" type='password' />
      </Form.Item>}
      
      <Form.Item>
        <Button type="primary" block>{bottomText}</Button>
      </Form.Item>

    </Form>
    <Link to = {linkPath}>{linkText}</Link>

        </div>
    </div>

  )
}

export default AuthComponent