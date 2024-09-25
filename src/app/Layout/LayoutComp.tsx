import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from "../sidebar/SideBar";
import Navbar from "../sidebar/NavBar"; 
import styles from '../../styles/layout.module.css';
import { Layout } from 'antd';

const LayoutComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authToken, setAuthToken] = useState(""); // Set initial state as null
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem("authState");
    const token = authState ? JSON.parse(authState).token : null;
    
    if (token) {
      setAuthToken(token);
    } 

    setLoaded(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {
        loaded ? ( // Wait until the loading state is true
          authToken ? ( // If authToken exists, render the layout
            <div style={{ width: "100%", display: "flex", height: "100vh" }}>
              <div style={{ display: "flex", height: "100vh" }}>
                {isSidebarOpen && (
                  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                )}
              </div>
              <Layout style={{ display: "flex" }}>
                <div>
                  <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                </div>
                <div className={styles.right}>
                  <Outlet />
                </div>
              </Layout>
            </div>
          ) : ( // If no authToken, navigate to login
            <Navigate to={"/login"} />
          )
        ) : null // If not loaded yet, render nothing (or a loading spinner, if desired)
      }
    </>
  );
};

export default LayoutComponent;
