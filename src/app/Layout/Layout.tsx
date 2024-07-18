import React, { useEffect, useState } from "react";
import { Navigate, Outlet,useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux';
import Sidebar from "../sidebar/SideBar";
import styles  from '../../styles/layout.module.css'

const Layout = () => {
  const [authToken, setAuthToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [countdown, setCountdown] = useState<number>(10); 

  
  
  useEffect(() => {
    const authState = localStorage.getItem("authState");
    const token = authState ? JSON.parse(authState).accessToken : "";
    if(token) {
      setAuthToken(token);
    }
    setLoaded(true);
  }, [])
  
  

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };
  
  
  return (
    <>
      {/* {
        (
          loaded ? (
            (authToken) ? (
              <div style={{ display: "flex"}}>
                
                <Sidebar/>
                <div className={styles.right}>
                  <Outlet />
                </div>
              </div>
              ) : (
                <Navigate to={"/doc"} />
              )
          ): null
        )
      } */}
    </>
  )
}

export default Layout