
import { useContext } from "react"
import SummaryData from "../components/dashboard/summaryData"
import { store } from "../utils/store"


const Home = () => {
  const {state}:any = useContext(store)

  

  return (
    <div>

        
        <h1>Home </h1>
        <SummaryData/>
    </div>
  )
}

export default Home