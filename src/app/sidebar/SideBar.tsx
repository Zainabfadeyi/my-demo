
// import React, { useEffect } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { SidebarData } from '../../app/sidebar/SideBarData';
// import SubMenu from './SubMenu';
// import styles from '../../styles/sidebar.module.css';

// interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         toggleSidebar();
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [toggleSidebar]);

//   return (
//     <>
//       <div className={styles.sidebarContainer}>
       
//         <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
//             <div className={styles.navIconClose}>
//               <AiIcons.AiOutlineClose onClick={toggleSidebar} style={{ color: "#000" }} />
//             </div>
        
//           {SidebarData.map((item, index) => (
//             <SubMenu item={item} key={index} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from '../../app/sidebar/SideBarData';
import SubMenu from './SubMenu';
import styles from '../../styles/sidebar.module.css';
import { RootState } from '../../api/store';
import { useSelector } from 'react-redux';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.user?.role || '');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleSidebar]);

  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
          <div className={styles.navIconClose}>
            <AiIcons.AiOutlineClose onClick={toggleSidebar} style={{ color: "#000" }} />
          </div>
        
          {SidebarData.filter(item => item.roles?.includes(userRole)).map((item, index) => (
            <SubMenu
              key={index}
              item={item}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
