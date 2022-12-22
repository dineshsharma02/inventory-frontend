import React, { useContext } from 'react'
import { store } from '../utils/store'

const User = () => {
    const {state}:any = useContext(store)
  return (
    <h1>Users</h1>
  )
}

export default User