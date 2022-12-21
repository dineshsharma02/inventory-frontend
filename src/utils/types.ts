import { AxiosError } from "axios"
import React, { ReactNode } from "react"


export interface DataProps {
    [key:string]: string
  }


export interface CustomAxiosError extends Omit<AxiosError,'response'>{
    response?:{
        data:{
            error: string
        }
    }
}

export interface AuthTokenType {
    headers?:{
        Authorization: string
    }
}


export interface UserType {
    email: string
    fullname: string
    id : string
    created_at: string
    role: string
    last_login: string
}

export interface AuthProps {
    errorCallBack?: () => void
    successCallBack?: () => void
}

export interface Props{
    Children?: ReactNode | null;
}

export type StoreType = {
    children: React.ReactNode;
}

export interface StoreProps {
    user?: UserType | null 
}

export enum ActionTypes {
    UPDATE_USER_INFO = "[action] update user info"
}

export interface ActionProps {
    type : ActionTypes,
    payload : UserType | null,
}


export interface StoreProviderProps{
    state:StoreProps,
    dispatch: (arg:ActionProps)=> void
}