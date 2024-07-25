import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "../sidebar/SideBar";
import Navbar from "../sidebar/NavBar"; 
import styles from '../../styles/layout.module.css';
import { Layout } from 'antd';
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";

const LayoutComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div style={{width:"100%", display:"flex", height:"100vh"}}>

        <div style={{display:"flex", height:"100vh"}}>
        {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
        </div>
        <Layout style={{display:"flex"}}>
          <div>
           <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          </div>
          <div className={styles.right}>
            <Outlet />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default LayoutComponent;
