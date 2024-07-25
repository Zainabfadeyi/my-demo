// src/components/navbar/Navbar.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from '../../styles/navbar.module.css';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen:boolean
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
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
  );
};

export default Navbar;
