import { AppstoreOutlined, DashboardOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
// import logo from "../assets"
// import Logo from "../assets/logo.svg"

const Logo = require("../assets/logo.png") as string;

// import Logo from "../assets/logo.png"

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <div className="header">
        <div className="brand">
          <img src={Logo} alt="logo" height={"60px"} />
        </div>
        <div className="rightNav">
          <div className="userAvatar">
            <UserOutlined className="icon user-icon" style={{ fontSize: "30px", color: "white" }} />
            <div className="text">Dinesh </div>
          </div>
          <div className="logoutButton">
            <LogoutOutlined className="icon logout-icon" style={{ fontSize: "30px", color: "white" }} />
          </div>
        </div>
      </div>
      

      <div className="bodyHolder">
        <div className="sideBar">
        <ul>
          <li>
            <AppstoreOutlined className="icon"/>
            <div className="text">Dashboard</div>
          </li>
          <li>
          
            <UserOutlined className="icon" />
            <div className="text">Users</div>
          </li>
          <li>
            <DashboardOutlined className="icon" />
            <div className="text">Dashboard</div>
          </li>
          <li>
            <DashboardOutlined className="icon" />
            <div className="text">Dashboard</div>
          </li>
        </ul>

      </div>


      <div className="mainContent">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
