import React, { ReactElement, useEffect, useState } from 'react'
import { ApartmentOutlined, DatabaseOutlined, GroupOutlined, ShopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { axiosRequest } from '../../utils/functions'
import { SummaryUrl } from '../../utils/network'
import { Spin } from 'antd'



interface SummaryDataProps{
    [key:string]:{
      title:string,
      count:number,
      icon: ReactElement,
    }
    
}

const tempSummary:SummaryDataProps = {
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

const SummaryData = () => {

  const [summaryData, setSummaryData] = useState(tempSummary)
  const [loading, setLoading] = useState(true)

  const getSummaryData = async() =>{
    const response = await axiosRequest({
      url: SummaryUrl,
      hasAuth: true,
    })
    setLoading(false)
    if (response){
      const result = response.data as {[key:string]:number}
      const _tempData = {...summaryData}
      Object.keys(result).map(item=>{
        _tempData[item].count = result[item]
        return null
      })
      setSummaryData(_tempData)
      
    }
  }

  useEffect(() => {
    getSummaryData()
  }, [])
  


  return (
    <div className="summaryContainer">
        {
        Object.values(summaryData).map((item,index)=> <div key = {index} className='card summaryContent'>
          <div className="info">
            <div className="title">{item.title}</div>
            <div className="count">{loading ? <Spin/> : item.count}</div>
          </div>
          <div className="icon">
            {item.icon}
          </div>
        </div>)
        }
    </div>
  )
}

export default SummaryData