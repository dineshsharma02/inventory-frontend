import { AppstoreOutlined, DashboardOutlined, GroupOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import { logout } from "../utils/functions";
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
          <div className="rightItem">
          <Link to="/invoice-section">
            <div className="newInvoiceButton">
              New Invoice 
            </div>
          </Link>
            <div className="logoutButton">
              <div className="text" onClick={logout}>
                Logout
              </div>
            </div>
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
            <GroupOutlined className="icon" />
            <div className="text">Groups</div>
          </Link>
          </li>

          <li>
          <Link to="/inventory" className={"sideBarLinks " + isActive("/inventory") }>
            <ShoppingCartOutlined className="icon" />
            <div className="text">Inventory</div>
          </Link>
          </li>

          <li>
          <Link to="/shops" className={"sideBarLinks " + isActive("/shops") }>
            <ShopOutlined className="icon" />
            <div className="text">Shops</div>
          </Link>
          </li>

          <li>
          <Link to="/users" className={"sideBarLinks " + isActive("/users") }>
            <UserOutlined className="icon" />
            <div className="text">Users</div>
          </Link>
          </li>

          <li>
          <Link to="/user-activities" className={"sideBarLinks " + isActive("/user-activities") }>
            <UserOutlined className="icon" />
            <div className="text">User activities</div>
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
