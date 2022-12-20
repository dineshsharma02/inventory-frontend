import {FC, useState} from 'react'
import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError ,DataProps } from '../utils/types';
// import {DataProps} from "../components/AuthComponent"
import axios , {AxiosError} from 'axios';
import { LoginUrl } from '../utils/network';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { tokenName } from '../utils/data';


interface LoginDataProps {
    data :{
        access: string
    }
}

const Login = () => {
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

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
            localStorage.setItem(tokenName,response.data.Access)
            history("/")
            setLoading(false)
            
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


