import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from 'styled-components';

const SidebarLink = styles(Link)`
  display: flex;
  color: #f5f5f5;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 9px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 2px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styles.span`
  margin-left: 16px;
`;

const DropdownLink = styles(Link)`
  background: #414757;
  height: 30px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

interface SubNavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  subNav?: SubNavItem[];
}

interface SubMenuProps {
  item: SidebarItem;
}

const SubMenu: React.FC<SubMenuProps> = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
    
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav?.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index}>
            {subItem.icon}
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
