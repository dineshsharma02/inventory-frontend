import {FC, useState} from 'react'
import AuthComponent from '../components/AuthComponent'
import {  DataProps } from '../utils/types';
// import {DataProps} from "../components/AuthComponent"
import { LoginUrl } from '../utils/network';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { tokenName } from '../utils/data';
import { useAuth } from '../utils/hooks';
import { axiosRequest } from '../utils/functions';


interface LoginDataProps {
    
    Access: string
    
}

const Login = () => {
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    useAuth({
        successCallBack:()=>{
            history("/")
        }
    })

    const onSubmit = async (values:DataProps)=>{
        setLoading(true)
        const response = await axiosRequest<LoginDataProps>({
            method:"post",
            url: LoginUrl,
            payload: values,
            errorObject:{
                message: "Login error"
            }
        })
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


