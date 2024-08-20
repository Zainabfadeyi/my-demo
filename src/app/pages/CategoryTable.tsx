import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from '../../styles/category.module.css';
import { Button, TextField } from '@mui/material';

// Define the Category type
interface Category {
  id: number;
  name: string;
}

const CategoryTable: React.FC = () => {
  const columnHelper = createColumnHelper<Category>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Category Name',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
  ];

  const [data, setData] = useState<Category[]>([
    { id: 1, name: 'Employment Agreement' },
    { id: 2, name: 'New Employer Document' },
    { id: 3, name: 'Departmental Benefits' },
    { id: 4, name: 'Offer Letter' },
    { id: 5, name: 'Faculty Benefit' },
    { id: 6, name: 'Student Benefit' },
    { id: 7, name: 'Staff Benefits' },
  ]);

  const [newCategory, setNewCategory] = useState<string>('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;

    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1; // Generate new ID
    const newCategoryObj = { id: newId, name: newCategory };
    setData((prev) => [...prev, newCategoryObj]);
    setNewCategory(''); // Clear input
  };

  const table = useReactTable<Category>({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.tableContainer}>
      <h3>Category Management</h3>
      <div className={styles.addCategory}>
        <TextField
          label="New Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHeaderCell}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.noRecordRow}>
              <td colSpan={2}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination can be added here if needed */}
    </div>
  );
};

export default CategoryTable;