import React, { ReactElement, useEffect, useState } from 'react'
import { ApartmentOutlined, DatabaseOutlined, GroupOutlined, ShopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { axiosRequest } from '../../utils/functions'
import { SummaryUrl, TopSellUrl } from '../../utils/network'
import { Spin } from 'antd'
import { InventoryProps } from '../../utils/types'



interface TopSellProps{
    [key:string]:{
      title:string,
      count:number,
      icon: ReactElement,
    }
    
}

const tempSummary:TopSellProps = {
    "total_inventory":{
      title: "Total Items",
      count: 25,
      icon: <span className="dashIcon inventory"><DatabaseOutlined /></span>,
      

    },
    "total_group":{
      title: "Total Groups",
      count: 25,
      icon: <span className="dashIcon group"><ApartmentOutlined /></span>
    },
    "total_shop":{
      title: "Total Shops",
      count: 25,
      icon: <span className="dashIcon shops"><ShopOutlined /></span>
    },
    "total_users":{
      title: "Total Users",
      count: 25,
      icon: <span className="dashIcon users"><TeamOutlined/></span>
    }

}

const TopSelling = () => {

  const [data, setData] = useState<InventoryProps[]>()
  const [loading, setLoading] = useState(true)

  const getTopSellData = async() =>{
    const response = await axiosRequest<InventoryProps[]>({
      url: TopSellUrl,
      hasAuth: true,
    })
    setLoading(false)
    if (response){
      console.log(response.data);
      
      const data = response.data.map(
        (item) => ({...item, 
                    photoInfo: item.photo,
                      groupInfo: item.group.name
                    
      }))
      setData(data)
      setLoading(false)
      
    }
  }

  useEffect(() => {
    getTopSellData()
  }, [])
  


  return (
    <div className="card">
      <h3>Top Selling Items</h3>
      <br />
    <div className="topSellContainer">
      
      
      {
        loading? <Spin/> :
        data?.map((item,index)=> <div key = {index} className="topSellItem">
              <div className='imageCon'>
                <img src={item.photo} alt = "img" />
              </div>
              <h3 className='title'>{item.name}</h3>
              <h4 className='total'><span>Total Sold: </span>{item.total}</h4>
              </div>)
      }
    </div>
    </div>
  )
}

export default TopSelling