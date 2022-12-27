import React, { useContext, useState } from 'react'
import {Form,Input, Button, notification} from 'antd'

import AuthComponent from '../components/AuthComponent'
import { ActionTypes, CustomAxiosError, DataProps } from '../utils/types'
import { LoginUrl } from '../utils/network'
import axios from 'axios'
import { useAuth } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { axiosRequest } from '../utils/functions'
import { store } from '../utils/store'


interface CheckUserProps {
    user_id : number
}

const CheckUser = () => {

  const [loading, setLoading] = useState(false)
  const {dispatch}:any = useContext(store)
  const history = useNavigate()
  useAuth({
    successCallBack:()=>{
        history("/")
    }
})


    const onSubmit = async (values:DataProps)=>{
        setLoading(true)


        const response = await axiosRequest<CheckUserProps>({
            method: 'post',
            url: LoginUrl,
            payload:{...values,is_new_user:true}
        })
        
        console.log(response);
        
        if (response){
            notification.success({
              message:"User Check Success"
          })
          dispatch({
            type: ActionTypes.UPDATE_PASSWORD_USER_ID,
            payload: response.data.user_id
          })
          history("/create-password")
          
        }
        setLoading(false)
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

export default CheckUser