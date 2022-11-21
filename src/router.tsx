import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FC} from "react"
import Login from "./pages/Login";


import React from 'react'
import NewUser from "./pages/NewUser";

const router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = "/login"  element ={<Login/>} />
            <Route path = "/check-user"  element ={<NewUser/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default router