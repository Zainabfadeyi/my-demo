// src/components/navbar/Navbar.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaPowerOff } from "react-icons/fa";
import styles from '../../styles/navbar.module.css';
import { useDispatch } from '../../api/hook';
import { clearUser } from '../../api/slices/userSlice';
import { logout } from '../../api/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../api/store';
import { useSelector } from 'react-redux';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen:boolean
}


const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
const dispatch = useDispatch();
const firstName = useSelector((state: RootState) => state.auth.user?.firstName);
  const lastName = useSelector((state: RootState) => state.auth.user?.lastName);
const handleLogout = () => {

  dispatch(logout());
  dispatch(clearUser());

  navigate("/login")
  
};
const handleProfileClick = () => {
  navigate("/userprofile");  // Navigate to user profile when placeholder is clicked
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
    
      {/* <div className={styles.logout} onClick={handleLogout}>
        <FaPowerOff/>
    </div> */}
    <div className={styles.placeholder} onClick={handleProfileClick}>
              <img src={`https://ui-avatars.com/api/?background=f00&color=fff&name=${firstName}+${lastName}`} alt=""  
              className={styles.profile}/>
    </div>
    </div>
  );
};

export default Navbar;
