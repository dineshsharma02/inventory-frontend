import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FC} from "react"
import Login from "./pages/Login";


import React from 'react'
import NewUser from "./pages/NewUser";
import Home from "./pages/Home";

const router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = "/login"  element ={<Login/>} />
            <Route path = "/"  element ={<Home/>} />
            <Route path = "/check-user"  element ={<NewUser/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default router