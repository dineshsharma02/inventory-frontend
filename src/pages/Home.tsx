
import { useContext } from "react"
import Purchase from "../components/dashboard/purchases"
import SaleByShop from "../components/dashboard/saleByShop"
import SummaryData from "../components/dashboard/summaryData"
import TopSelling from "../components/dashboard/topSellData"
import { store } from "../utils/store"


const Home = () => {
  const {state}:any = useContext(store)

  

  return (
    <div>

        <SummaryData/>
        <br />
        <div className="dashboard-ui-st">
          <TopSelling/>
        

          <div>
            <SaleByShop/>
            <br />
            <Purchase/>
          </div>
          
        </div>

        
    </div>
  )
}

export default Home