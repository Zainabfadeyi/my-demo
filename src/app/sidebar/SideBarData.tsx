import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from "react-icons/gr";
import * as MdIcons from 'react-icons/md';
// export interface SubNavItem {
//   title: string;
//   path: string;
//   icon?: JSX.Element;
//   cName?: string;
//   subNav?: SubNavItem[];
//   iconClosed?: JSX.Element;
//   iconOpened?: JSX.Element;
// }

// export interface SidebarItem {
//   title: string;
//   path: string;
//   icon?: JSX.Element;
//   iconClosed?: JSX.Element;
//   iconOpened?: JSX.Element;
//   subNav?: SubNavItem[];
// }

// export const SidebarData: SidebarItem[] = [
//   {
//     title: 'Dashboard',
//     path: '/dashboard',
//     icon: <AiIcons.AiFillHome />,
    
  
//   },
//   {
//     title: 'Memo Workflow',
//     path: '/form',
//     icon: <GrIcons.GrNotes/>
//   },
//   {
//     title: 'Inbox',
//     path: '/inbox',
//     icon: <FaIcons.FaInbox />
//   },
//   {
//     title: 'Montoring',
//     path:"#",
//     icon: <IoIcons.IoIosPaper />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
      
//       {
//         title: 'My Request',
//         path: '/my-request',
//         cName: 'sub-nav'
//       },
//       {
//         title: 'My active task',
//         path: '/my-active-task',
//         cName: 'sub-nav'
//       },
//       {
//         title: 'All Request',
//         path: '/all-request',
//         cName: 'sub-nav'
//       },
//     ]
//   },
//   // {
//   //   title: 'Account',
//   //   path: '/Account',
//   //   icon: <FaIcons.FaEnvelopeOpenText />,
//   // },
  
//   {
//     title: 'Settings',
//     path: '#',
//     icon: <IoIcons.IoIosPaper />,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [  
//       {
//         title: 'Category Type',
//         path: '/category-type',
//       },
//       {
//         title: 'Locations',
//         path: '/locations',
//       },  
//       // {
//       //   title: 'Participants',
//       //   path: '/participants',
//       // }, 
//     ]
//   },
  
// ];

export interface SubNavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  cName?: string;
  subNav?: SubNavItem[];
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  roles?: string[]; // Add roles to SubNavItem
}

export interface SidebarItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  subNav?: SubNavItem[];
  roles?: string[]; // Add roles to SidebarItem
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    roles: ['ADMIN', 'USER'], // Accessible to both admin and user
  },
  {
    title: 'Memo Workflow',
    path: '/form',
    icon: <GrIcons.GrNotes />,
    roles: ['ADMIN', 'USER'],
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: <FaIcons.FaInbox />,
    roles: ['ADMIN', 'USER'],
  },
  {
    title: 'Monitoring',
    path: '#',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'My Request',
        path: '/my-request',
        cName: 'sub-nav',
        roles: ['ADMIN', 'USER'],
      },
      {
        title: 'My active task',
        path: '/my-active-task',
        cName: 'sub-nav',
        roles: ['ADMIN', 'USER'],
      },
      {
        title: 'All Request',
        path: '/all-request',
        cName: 'sub-nav',
        roles: ['ADMIN'],
      },
    ],
    roles: ['ADMIN', 'USER'],
  },
  {
    title: 'Settings',
    path: '#',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Category Type',
        path: '/category-type',
        roles: ['ADMIN'], // Only admin can access
      },
      {
        title: 'Locations',
        path: '/locations',
        roles: ['ADMIN', 'USER'],
      },
    ],
    roles: ['ADMIN','USER'],
  },
];
