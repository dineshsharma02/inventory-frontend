import React, { useContext, useEffect, useState } from 'react'
import {Form,Input, Button, notification} from 'antd'

import AuthComponent from '../components/AuthComponent'
import { ActionTypes, CustomAxiosError, DataProps } from '../utils/types'
import { LoginUrl, UpdatePasswordUrl } from '../utils/network'
import axios from 'axios'
import { useAuth } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { axiosRequest } from '../utils/functions'
import { store } from '../utils/store'



const UpdateUserPassword = () => {

  const [loading, setLoading] = useState(false)
  const {state:{updatePasswordUserId},dispatch}:any = useContext(store)

  const history = useNavigate()

  useEffect(() => {
    if(!updatePasswordUserId){
      history("/")
    }
  
  }, [])
  

  useAuth({
    successCallBack:()=>{
        history("/")
    }
})


    const onSubmit = async (values:DataProps)=>{
        

        if (values['password']!= values['cpassword']){
          notification.error({
            message:"Operation Error",
            description: "Both passwords do not match!"
          })
          return
        }

        setLoading(true)
        const response = await axiosRequest({
            method: 'post',
            url: UpdatePasswordUrl,
            payload:{...values, user_id : updatePasswordUserId}
        })
        
        console.log(response);
        
        if (response){
            
          dispatch({
            type: ActionTypes.UPDATE_PASSWORD_USER_ID,
            payload: null
          })
          notification.success({
            message:"Operation Successful",
            description: "Your password was created succesfully"
          })
          history("/login")
          setLoading(false)
          
        }
        setTimeout(()=>setLoading(false),2000)

        
    }

  return (
    <AuthComponent
        titleText = "Create Password"
        // isPassword = {true}
        bottomText = "Update"
        linkText = "Go Back"
        linkPath = "/check-user"
        isUpdatePassword={true}
        onSubmit={onSubmit}
        loading = {loading}
    
        />
  )
}

export default UpdateUserPassword