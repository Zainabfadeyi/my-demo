
import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button, TextField } from '@mui/material';
import styles from '../../styles/table.module.css';
import axios from '../../api/axios';
import { UseSelector } from '../../api/hook';
import { RootState } from '../../api/store';

interface Participant {
  task: string;
  name: string;
  user: string;
}

const Participants: React.FC = () => {
  const columnHelper = createColumnHelper<Participant>();
  const accessToken = UseSelector((state: RootState) => state.auth.user?.accessToken
);
  const columns = [
    columnHelper.accessor('task', {
      header: 'Task',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('user', {
      header: 'User',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];

  const [data, setData] = useState<Participant[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchParticipants = async () => {
      console.log("this is token", accessToken)
      try {
        const response = await axios.get('/api/v1/memo/default-admins',{
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const participants: Participant[] = [
          {
            task: 'Requester',
            name: `${response.data.requester.firstName} ${response.data.requester.lastName}`,
            user: response.data.requester.userIdentifier,
          },
          {
            task: 'First Approval',
            name: `${response.data.firstApprover.firstName} ${response.data.firstApprover.lastName}`,
            user: response.data.firstApprover.userIdentifier,
          },
          {
            task: 'Final Approval',
            name: `${response.data.finalApprover.firstName} ${response.data.finalApprover.lastName}`,
            user: response.data.finalApprover.userIdentifier,
          },
        ];
        setData(participants); 
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  const table = useReactTable<Participant>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.participantContainer}>
      <div className={styles.participantsTop}>
        <div style={{ fontSize: "20px", fontWeight: "600", padding: "10px" }}>Participants</div>
      </div>

      <table className={styles.participantTable}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: "15px" }} className={styles.tableHeaderCell}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "15px" }} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;