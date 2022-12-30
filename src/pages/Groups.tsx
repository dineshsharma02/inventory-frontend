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
import { axiosRequest, getAuthToken, getGroups } from "../utils/functions";
import { AuthTokenType, DataProps, GroupProps } from "../utils/types";
import { GroupUrl, usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";
import AddGroupForm from "../components/AddGroupForm";

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







const Groups = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [modalState, SetModalState] = useState(false);
  const [groups, setGroups] = useState<GroupProps[]>([])




  const columns =[
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Belongs To (another group)",
      dataIndex: "belongsTo",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
    },
    {
      title: "Total items",
      dataIndex: "total_items",
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
    },

    {
      title: "Action",
      dataIndex: "action",
    },
    
  ];
  
  
  getGroups(setGroups,setFetching)



  const onCreateUser = () =>{
    SetModalState(false)
    setFetching(true)
    getGroups(setGroups,setFetching)
  }
  return(
    <ContentLayout
      pageTitle="Group"
      setModalState={SetModalState}
      dataSource={(groups as unknown) as DataProps[]} 
      columns={columns}
      fetching={fetching}>
      
      <AddGroupForm
  
        onSuccessCallBack={onCreateUser} 
        
        isVisible={modalState}
        onClose={()=>SetModalState(false)}
        groups = {groups}
      />
    </ContentLayout>
  )
};

export default Groups;
