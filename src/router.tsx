import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "./pages/Login";

import React from "react";
import CheckUser from "./pages/CheckUser";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import User from "./pages/User";
import UpdateUserPassword from "./pages/UpdateUserPassword";
import Groups from "./pages/Groups";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/check-user" element={<CheckUser />} />
        <Route path="/create-password" element={<UpdateUserPassword />} />
        {/* <Route path="/user" element={<User />}/> */}
        {/* <Route
          path="/"
          element={
            <AuthRoute
              Children1={<Route path="/" element={<Home /> } />}
              Children2={<Route path="/users" element={<User /> } />}

              
            ></AuthRoute>
          }
        /> */}
        <Route path="/" element={<AuthRoute Children={<Route path="/" element={<Home /> } />}></AuthRoute>}/>
        <Route path="/users" element={<AuthRoute Children={<Route path="/" element={<User /> } />}></AuthRoute>}/>
        <Route path="/groups" element={<AuthRoute Children={<Route path="/" element={<Groups /> } />}></AuthRoute>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
