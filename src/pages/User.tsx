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
import { getAuthToken } from "../utils/functions";
import { AuthTokenType } from "../utils/types";
import { usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";

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
    const headers = getAuthToken() as AuthTokenType
    const response: AxiosResponse = await axios
      .get(usersUrl, headers)
      .catch((e) => {
        notification.error({
          message: "Operation Error",
          description: e.response?.data.error,
        });

      }) as AxiosResponse;
    if (response){
      // console.log(response);
      const data = (response.data as UserProps[]).map(
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
    <>
      <div className="card">
        <div className="cardHeader">
          <h1 className="headContent">Users</h1>
          <div className="rightContent">
            <div className="searchInput">
              <input type="text" name="" id="" />
            </div>
            <button onClick={()=>SetModalState(true)}>Add User</button>
          </div>
        </div>
        <br />
        <br />
        <Table columns={columns} dataSource={users} loading = {fetching} size="middle" />
      </div>

      <AddUserForm
        onSuccessCallBack={onCreateUser} 
        
        isVisible={modalState}
        onClose={()=>SetModalState(false)}
      />
    </>
  );
};

export default User;
