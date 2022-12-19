import {FC, useState} from 'react'
import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError ,DataProps } from '../utils/types';
// import {DataProps} from "../components/AuthComponent"
import axios , {AxiosError} from 'axios';
import { LoginUrl } from '../utils/network';
import { notification } from 'antd';

const Login = () => {
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values:DataProps)=>{
        setLoading(true)
        const response = await axios.post(LoginUrl,values).catch(
            (e:CustomAxiosError)=>{
                notification.error({
                    message:"Login Error",
                    description: e.response?.data.error
                })
                
            }
        )
        if (response){
            notification.success({
                message:"User Logged In",
                // description: e.response?.data.error
            })
            
        }
        setTimeout(()=>setLoading(false),2000)

        
    }

  return (
        <AuthComponent 
        titleText = "Sign In"
        isPassword = {true}
        bottomText = "Login"
        linkText = "New User?"
        linkPath = "/check-user"
        onSubmit={onSubmit}
        loading={loading}
    
        />

  )
}

export default Login


