import { useEffect } from "react"
import { authHandler, logout } from "./functions"
import { AuthProps, UserType } from "./types"



export const useAuth = async (
    {
        errorCallBack,
        successCallBack
    }:AuthProps) =>{
    useEffect(() => {
        const checkUser = async () =>{
          const user:UserType | null = await authHandler()
          if (!user){
            if (errorCallBack){
                errorCallBack()
            }
            return 

          }


            if (successCallBack){
            successCallBack()
            }
        }
        checkUser()
      
      }, [])
}
