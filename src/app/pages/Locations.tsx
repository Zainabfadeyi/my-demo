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
import { number } from 'yup';

interface LocationProps {
  id: number;
  location: string;
  department: string;
}

interface LocationRequest {
  locationName: string;
  departmentName: string;
}

const Locations: React.FC = () => {
  const columnHelper = createColumnHelper<LocationProps>();
  const accessToken = UseSelector((state: RootState) => state.auth.user?.accessToken);
  const [data, setData] = useState<LocationProps[]>([]);
  const [newLocation, setNewLocation] = useState<LocationRequest>({ locationName: '', departmentName: '' });
  const userId = UseSelector((state: RootState) => state.auth.user?.id);
  const columns = [
    columnHelper.accessor('id', {
      header: 'LocationID',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('department', {
      header: 'Department',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];

  // Fetch Locations
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('/api/v1/locations', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass access token in headers
          },
        });
        const locations = response.data.map((loc: any) => ({
          id: loc.id,
          location: loc.location,
          department: loc.department,
        }));
        setData(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocation();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/v1/locations/${userId}`,
        {
          locationName: newLocation.locationName,
          departmentName: newLocation.departmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Add the new location to the table
      setData([...data, response.data]);

      // Clear the form
      setNewLocation({ locationName: '', departmentName: '' });
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  const table = useReactTable<LocationProps>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.participantContainer}>
      <div className={styles.participantsTop}>
        <div style={{ fontSize: '20px', fontWeight: '600', padding: '10px' }}>Locations</div>
      </div>

      {/* Form for adding a new location */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Location Name"
          name="locationName"
          value={newLocation.locationName}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Department Name"
          name="departmentName"
          value={newLocation.departmentName}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Location
        </Button>
      </form>

      {/* Locations Table */}
      <table className={styles.participantTable}>
        <thead >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: '15px' }} className={styles.tableHeaderCell}>
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
                  <td key={cell.id} style={{ padding: '15px' }} className={styles.tableCell}>
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

      {/* Pagination */}
      <div className={styles.paginationContainer}>
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className={styles.paginationButton}
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className={styles.paginationButton}
        >
          {'>'}
        </button>

        <span className={styles.pageInfo}>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className={styles.goToPageContainer}>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className={styles.pageInput}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className={styles.pageSizeSelect}
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Locations;
