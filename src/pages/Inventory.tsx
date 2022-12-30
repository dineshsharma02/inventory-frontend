import React, { useState, useContext, useEffect } from "react";
import { store } from "../utils/store";


import { Button,  } from "antd";
import { axiosRequest, getAuthToken } from "../utils/functions";
import { AuthTokenType, DataProps, GroupProps, InventoryProps } from "../utils/types";
import { InventoryUrl, usersUrl } from "../utils/network";
import axios, { AxiosResponse } from "axios";
import { ItemRender } from "antd/es/upload/interface";
import ContentLayout from "../components/ContentLayout";
import AddInventoryForm from "../components/AddInventoryForm";
import { useGetGroups } from "../utils/hooks";
import AddInventoryFormCSV from "../components/AddInventoryFormCSV";



enum ModalState {
  addItem,
  addItemCSV,
  off
}

const Inventory = () => {
  const { state }: any = useContext(store);

  const [fetching, setFetching] = useState(true);
  const [modalState, SetModalState] = useState<ModalState>(ModalState.off);
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
  


  const onCreateInventory = () =>{
    SetModalState(ModalState.off)
    setFetching(true)
    getInventories()
  }
  return (
    <ContentLayout 
      pageTitle="Inventory"
      setModalState={(state)=> SetModalState(ModalState.addItem)}
      dataSource={(inventories as unknown) as DataProps[]} 
      extraButton = {<Button type="primary" onClick={()=>SetModalState(ModalState.addItemCSV)}>Add Inventories(CSV)</Button>}
      columns={columns}
      fetching={fetching}>
      
      <AddInventoryForm
        onSuccessCallBack={onCreateInventory} 
        
        isVisible={modalState === ModalState.addItem}
        onClose={()=>SetModalState(ModalState.off)}
        groups = {groups}
      />

      <AddInventoryFormCSV
        onSuccessCallBack={onCreateInventory} 
        
        isVisible={modalState === ModalState.addItemCSV}
        onClose={()=>SetModalState(ModalState.off)}
        
      />
    </ContentLayout>
  );
};

export default Inventory;
