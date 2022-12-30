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
import { AuthTokenType, DataProps, GroupProps, InventoryProps } from "../utils/types";
import { InventoryUrl, usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";
import AddInventoryForm from "../components/AddInventoryForm";
import { useGetGroups } from "../utils/hooks";

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







const Inventory = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [modalState, SetModalState] = useState(false);
  const [inventories, setInventories] = useState<InventoryProps[]>([])
  const [groups, setGroups] = useState<GroupProps[]>([])

  useGetGroups(setGroups, () => null)




const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Photo',
    dataIndex: 'photoInfo',
    key: 'photoInfo',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'groupInfo',
    key: 'groupInfo',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Remaining',
    dataIndex: 'remaining',
    key: 'remaining',
  },
  {
    title: 'Added On',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',
  },
];


  
  
  


  const getInventories = async() =>{
    
    const response = await axiosRequest<InventoryProps[]>({
      url:InventoryUrl,
      hasAuth:true,
      showError: false,
    })

    if (response){
      console.log(response.data);
      
      const data = response.data.map(
        (item) => ({...item, 
                    photoInfo: <div className="imageField" 
                                    style={{
                                      backgroundImage: `url(${item.photo})`,
                                      width: "70px",
                                      height: "70px"}}
                                      />,
                    groupInfo: item.group.name
      }))
      setInventories(data)
      setFetching(false)
      
    }
  }

  useEffect(() => {
    getInventories()
  
    
  }, [])
  


  const onCreateUser = () =>{
    SetModalState(false)
    setFetching(true)
    getInventories()
  }
  return (
    <ContentLayout 
      pageTitle="Inventory"
      setModalState={SetModalState}
      dataSource={(inventories as unknown) as DataProps[]} 
      columns={columns}
      fetching={fetching}>
      
      <AddInventoryForm
        onSuccessCallBack={onCreateUser} 
        
        isVisible={modalState}
        onClose={()=>SetModalState(false)}
        groups = {groups}
      />
    </ContentLayout>
  );
};

export default Inventory;
