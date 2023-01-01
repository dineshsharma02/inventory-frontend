import { useContext, useEffect } from "react"
import { authHandler, axiosRequest, getGroups, getInventories, getShops, logout } from "./functions"
import { ActionTypes, AuthProps, GroupProps, InventoryProps, ShopProps, UserType } from "./types"
import {store} from "./store"
import { GroupUrl } from "./network"



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



export const useGetGroups = (setGroups: (data: GroupProps[])=> void, setFetching:(val:boolean)=>void) =>{
  

  useEffect(()=> {
    getGroups(setGroups,setFetching)
  },[])

}


export const useGetInventories = (
  setInventory: (data: InventoryProps[]) => void, 
  setFetching: (val:boolean) => void) => {
  
    useEffect(() => {
      getInventories(setInventory, setFetching)
    }, [])
}



export const useGetShops = (
  setShops: (data: ShopProps[]) => void, 
  setFetching: (val:boolean) => void) => {

    useEffect(() => {
      getShops(setShops, setFetching)
    }, [])
}