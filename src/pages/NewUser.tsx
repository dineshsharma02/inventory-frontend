import React from 'react'
import {Form,Input, Button} from 'antd'
import AuthComponent from '../components/AuthComponent'

const NewUser = () => {
  return (
    <AuthComponent
        titleText = "Verify Yourself!"
        isPassword = {false}
        bottomText = "Submit"
        linkText = "Go Back"
        linkPath = "/login"
    
        />
  )
}

export default NewUser