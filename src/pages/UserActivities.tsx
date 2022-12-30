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
import { ShopUrl, UserActivityUrl, usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";
import AddShopForm from "../components/AddShopForm";


interface UserActivityProps {
  id: number;
  created_at: string;
  action: string;
  email: string;

}







const UserActivities = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [userActivities, setUserActivities] = useState<UserActivityProps[]>()




  const columns =[
    {
      title: "ID",
      dataIndex: "id",
      key: 'id'
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },

    {
      title: "Performed By",
      dataIndex: "email",
      key: "email",
    },
    
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },

    
    
  ];
  
  
  


  const getActivities = async() =>{
    
    const response = await axiosRequest<{results:UserActivityProps[]}>({
      url:UserActivityUrl,
      hasAuth:true,
      showError: false,
    })
    // console.log("here");
    
    if (response){
      
      const data = response.data.results.map((item)=>({...item}))
      console.log(data);
      
      setUserActivities(data)
      setFetching(false)
      
    }
  }

  useEffect(() => {
    getActivities()
  
    
  }, [])
  


  return (
    <ContentLayout 
      pageTitle="User Activities"
      dataSource={(userActivities as unknown) as DataProps[]} 
      columns={columns}
      fetching={fetching}
      disableAddButton = {true}
    />

    
  );
};

export default UserActivities;
