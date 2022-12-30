import { AppstoreOutlined, DashboardOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link , useLocation} from "react-router-dom";
// import logo from "../assets"
// import Logo from "../assets/logo.svg"

const Logo = require("../assets/logo.png") as string;

// import Logo from "../assets/logo.png"

const Layout = ({ children }: any) => {
  
  const location = useLocation()
  const [activePath, setActivePath] = useState("/")

  useEffect(() => {
    setActivePath(location.pathname)
    // console.log({pathInfo: location.pathname});

    
    
  }, [location.pathname])

  const isActive = (path:string):string =>{
    switch(activePath){
      case path:
        return "active"
      default:
        return ""
    }
  }
  



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
            <Link to="/" className={"sideBarLinks " + isActive("/") }>
              <AppstoreOutlined className="icon"/>
              <div className="text">Dashboard</div>
            </Link>
            
          </li>

          <li >
          <Link to="/groups" className={"sideBarLinks " + isActive("/groups") }>
            <UserOutlined className="icon" />
            <div className="text">Groups</div>
          </Link>
          </li>

          <li>
          <Link to="/inventory" className={"sideBarLinks " + isActive("/inventory") }>
            <UserOutlined className="icon" />
            <div className="text">Inventory</div>
          </Link>
          </li>

          <li>
          <Link to="/users" className={"sideBarLinks " + isActive("/users") }>
            <UserOutlined className="icon" />
            <div className="text">Users</div>
          </Link>
          </li>

          <li>
          <Link to="/users" className={"sideBarLinks " + isActive("/etc") }>
            <UserOutlined className="icon" />
            <div className="text">etc</div>
          </Link>
          </li>
        </ul>

      </div>


      <div className="mainContent">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
