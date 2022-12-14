import React, { useState, useContext, useEffect } from "react";
import { store } from "../utils/store";

import { notification, TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import AddUserForm from "../components/AddUserForm";
import { axiosRequest, getAuthToken } from "../utils/functions";
import { AuthTokenType, DataProps } from "../utils/types";
import { usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface UserProps {
  created_at: string;
  email:string;
  fullname: string;
  is_active:string;
  last_login:string;
  role:string;
  key:number;
  id:number;

}







const User = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [modalState, SetModalState] = useState(false);
  const [users, setUsers] = useState<UserProps[]>()




  const columns =[
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "fullname",
    },
    {
      title: "Active status",
      dataIndex: "is_active",
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
    },
  ];
  
  
  


  const getUsers = async() =>{
    
    const response = await axiosRequest<UserProps[]>({
      url:usersUrl,
      hasAuth:true,
      showError: false,
    })

    if (response){
      const data = response.data.map(
        (item) => ({...item,key:item.id,is_active:item.is_active.toString().toUpperCase()}))
      setUsers(data)
      setFetching(false)
      
    }
  }

  useEffect(() => {
    getUsers()
  
    
  }, [])
  


  const onCreateUser = () =>{
    SetModalState(false)
    setFetching(true)
    getUsers()
  }
  return (
    <ContentLayout 
      pageTitle="User"
      setModalState={SetModalState}
      dataSource={(users as unknown) as DataProps[]} 
      columns={columns}
      fetching={fetching}>
      
      <AddUserForm
        onSuccessCallBack={onCreateUser} 
        
        isVisible={modalState}
        onClose={()=>SetModalState(false)}
      />
    </ContentLayout>
  );
};

export default User;
