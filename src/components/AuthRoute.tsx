import React, { useState } from 'react'
import { logout } from '../utils/functions'
import { useAuth } from '../utils/hooks'
import { Props } from '../utils/types'
import { Routes } from 'react-router-dom'

const AuthRoute = ({Children}: Props) => {
    const [loading, setLoading] = useState(true)
    useAuth({
        errorCallBack:()=>{
            logout()
        },
        successCallBack:()=>{
            setLoading(false)
        }
    })
    if (loading){
        return <i>loading.....</i>
    }
  return (
    <div><Routes>{Children}</Routes></div>
  )
}

export default AuthRoute