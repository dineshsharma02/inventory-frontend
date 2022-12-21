import { useContext, useEffect } from "react"
import { authHandler, logout } from "./functions"
import { ActionTypes, AuthProps, UserType } from "./types"
import {store} from "./store"



export const useAuth = async (
    {
        errorCallBack,
        successCallBack
    }:AuthProps) =>{

    const { dispatch } :any = useContext(store)


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
              dispatch({type:ActionTypes.UPDATE_USER_INFO,payload:user})
              successCallBack()
            }
        }
        checkUser()
      
      }, [])
}
