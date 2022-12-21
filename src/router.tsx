import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FC} from "react"
import Login from "./pages/Login";


import React from 'react'
import NewUser from "./pages/NewUser";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";

const router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path = "/login"  element ={<Login/>} />
            <Route path = "/check-user"  element ={<NewUser/>} />
            <Route path = "/" element={<AuthRoute Children={<Route path="/"  element={<Home/>}/>}></AuthRoute>} />

        </Routes>
    </BrowserRouter>
  )
}

export default router