// import {FC} from 'react'

import React from 'react'
import {Form,Input, Button} from 'antd'
import AuthComponent from '../components/AuthComponent'

const Login = () => {
  return (
        <AuthComponent 
        titleText = "Sign In"
        isPassword = {true}
        bottomText = "Login"
        linkText = "New User?"
        linkPath = "/check-user"
    
        />

  )
}

export default Login


