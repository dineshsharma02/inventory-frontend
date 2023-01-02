import React, { ReactElement, useEffect, useState } from "react";

import { axiosRequest } from "../../utils/functions";
import { SaleByShopUrl, SummaryUrl, TopSellUrl } from "../../utils/network";
import { Spin } from "antd";
import { Chart as ChartJS, ArcElement,Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement,Tooltip,Legend)

interface SaleByShopProps {
  amount_total: number
  name: string
}



const SaleByShop = () => {
  const [data, setData] = useState<SaleByShopProps[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await axiosRequest<SaleByShopProps[]>({
      url: SaleByShopUrl,
      hasAuth: true,
    });
    setLoading(false);
    console.log(response);
    
    if (response) {
      setData(response.data)


    }
    setLoading(false);
  };

  useEffect(() => {
    getData()
  }, [])

  const getChartData = () =>{
    
    
    const colorList = data.map(item=> "#" + (Math.random()*0xFFFFFF<<0).toString(16))
    return {
      labels: data.map(item=>item.name),
      datasets: [
        {
          data: data.map(item=>item.amount_total),
          
          backgroundColor: colorList,
          borderColor: colorList,
          borderWidth: 1,
        }
      ]
    }
  }



  

  const options = {
    
    plugins: {
      legend: {
        display: true,
        labels:{
          font:{
            size:12,
          }
        }
      },
      
      
    }
  }

  return (
    <div className="card">
      <h3>Sales By Shop</h3>
      <div>
        {loading? <Spin/> :
        <Pie data={getChartData()} options = {options}/>}
      </div>
    </div>
  );
};

export default SaleByShop;
