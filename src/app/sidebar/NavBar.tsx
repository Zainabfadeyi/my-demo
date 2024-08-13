// src/components/navbar/Navbar.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaPowerOff } from "react-icons/fa";
import styles from '../../styles/navbar.module.css';
import { useDispatch } from '../../api/hook';
import { clearUser } from '../../api/slices/userSlice';
import { logout } from '../../api/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen:boolean
}


const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
const dispatch = useDispatch();
const handleLogout = () => {

  dispatch(logout());
  dispatch(clearUser());

  navigate("/login")
};
  return (
    <div className={styles.container}>
    <div className={styles.cover}>
    <div className={styles.navbar}>
      {!isSidebarOpen && (
        <div className={styles.navIcon}>
          <FaIcons.FaBars onClick={toggleSidebar} style={{ color: "#000" }} />
        </div>
      )}
    </div>
    <div className={styles.memo}> Memorandum Form and WorkFlow </div>
    </div>
      <div className={styles.logout} onClick={handleLogout}>
        <FaPowerOff/>
    </div>
    </div>
  );
};

export default Navbar;
