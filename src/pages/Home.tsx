import React, { useEffect, useState } from 'react'
import { authHandler, logout } from '../utils/functions'
import { UserType } from '../utils/types'
const Home = () => {
    const [loading, setLoading] = useState(true)


    useEffect(() => {
      const checkUser = async () =>{
        const user:UserType | null = await authHandler()
        if (!user){
            logout()
            return
        }
        setLoading(false)
      }
      checkUser()
    
    }, [])
    
    if (loading){
        return <i>Loading .....</i>
    }
    
  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home