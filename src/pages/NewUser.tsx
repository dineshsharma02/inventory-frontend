import React, { useState } from 'react'
import {Form,Input, Button, notification} from 'antd'

import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError, DataProps } from '../utils/types'
import { LoginUrl } from '../utils/network'
import axios from 'axios'
import { useAuth } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'

const NewUser = () => {

  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  useAuth({
    successCallBack:()=>{
        history("/")
    }
})


    const onSubmit = async (values:DataProps)=>{
        setLoading(true)
        const response = await axios.post(LoginUrl,{...values,is_new_user:true}).catch(
            (e:CustomAxiosError)=>{
                notification.error({
                    message:"User Check Error",
                    description: e.response?.data.error
                })
                
            }
        )
        if (response){
            notification.success({
              message:"User Logged In"
          })
          setLoading(false)
        }
        setTimeout(()=>setLoading(false),2000)

        
    }

  return (
    <AuthComponent
        titleText = "Verify Yourself!"
        isPassword = {false}
        bottomText = "Submit"
        linkText = "Go Back"
        linkPath = "/login"
        onSubmit={onSubmit}
        loading = {false}
    
        />
  )
}

export default NewUser