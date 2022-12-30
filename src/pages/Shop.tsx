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
import { ShopUrl, usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";
import AddShopForm from "../components/AddShopForm";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface ShopProps {
  created_at: string;
  created_by: {
    email: string;
  }
  created_by_email?: string;
  name: string;
  id:number;

}







const Shop = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [modalState, SetModalState] = useState(false);
  const [shops, setShops] = useState<ShopProps[]>()




  const columns =[
    {
      title: "ID",
      dataIndex: "id",
      key: 'id'
    },
    
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

    },
    {
      title: "Created By",
      dataIndex: "created_by_email",
      key: "created_by_email",
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
    
  ];
  
  
  


  const getShops = async() =>{
    
    const response = await axiosRequest<{results:ShopProps[]}>({
      url:ShopUrl,
      hasAuth:true,
      showError: false,
    })

    if (response){
      const data = response.data.results.map((item)=>({...item, created_by_email:item.created_by.email}))
      console.log(data);
      
      setShops(data)
      setFetching(false)
      
    }
  }

  useEffect(() => {
    getShops()
  
    
  }, [])
  


  const onCreateShop = () =>{
    SetModalState(false)
    setFetching(true)
    getShops()
  }
  return (
    <ContentLayout 
      pageTitle="Shop"
      setModalState={SetModalState}
      dataSource={(shops as unknown) as DataProps[]} 
      columns={columns}
      fetching={fetching}>
      
      <AddShopForm
        onSuccessCallBack={onCreateShop} 
        
        isVisible={modalState}
        onClose={()=>SetModalState(false)}
      />
    </ContentLayout>
  );
};

export default Shop;
