import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from "react-icons/gr";
import * as MdIcons from 'react-icons/md';
export interface SubNavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  cName?: string;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  subNav?: SubNavItem[];
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
  },
  {
    title: 'Memo Workflow',
    path: '/form',
    icon: <GrIcons.GrNotes/>
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: <FaIcons.FaInbox />
  },
  {
    title: 'Montoring',
    path:"#",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'My Active Task',
        path: '/active-task',
        cName: 'sub-nav'
      },
      {
        title: 'My Request',
        path: '/my-request',
        cName: 'sub-nav'
      },
      {
        title: 'All Active Task',
        path: '/all-active-task',
      },
      {
        title: 'All Request',
        path: '/all-request',
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  
  {
    title: 'Account',
    path: '#',
    icon: <FaIcons.FaEnvelopeOpenText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Profile',
        path: '/account/profile',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Settings',
        path: '/account/settings',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />
      }
    ]
  },
  
];
