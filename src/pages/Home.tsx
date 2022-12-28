import { useContext } from "react"
import { store } from "../utils/store"


const Home = () => {
  const {state}:any = useContext(store)

  return (
    <div>

        
        <h1>Home </h1>

    </div>
  )
}

export default Home