import React, { ReactElement, useEffect, useState } from 'react'
import { ApartmentOutlined, DatabaseOutlined, GroupOutlined, ShopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { axiosRequest } from '../../utils/functions'
import { PurchaseSummaryUrl, SummaryUrl, TopSellUrl } from '../../utils/network'
import { Spin } from 'antd'
import { InventoryProps } from '../../utils/types'



interface PurchaseProps{
    price:number
    count:number
    
}


const Purchase = () => {

  const [data, setData] = useState<PurchaseProps>()
  const [loading, setLoading] = useState(true)

  const getPurchaseData = async() =>{
    const response = await axiosRequest<PurchaseProps>({
      url: PurchaseSummaryUrl,
      hasAuth: true,
    })
    setLoading(false)
    if (response){
      const res_data = response.data
      setData(res_data)
      setLoading(false)
    }
      
      
    }
  

  useEffect(() => {
    getPurchaseData()
  }, [])
  


  return (
    <div className="card">
      <h3>Purchase</h3>
      <br />
      <div className="purchases">
        <div className="content">
          <div className="title">{data?.price}</div>
          
          <div className="info">(Price)</div>

        </div>

        <div className="content">
          <div className="title">{data?.count}</div>
          <div className="info">(Count)</div>

        </div>
        
      </div>    
    </div>
  )

  }
export default Purchase