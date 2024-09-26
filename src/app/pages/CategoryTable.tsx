import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TextField } from '@mui/material';
import axios from '../../api/axios'; // Import axios
import styles from '../../styles/table.module.css'
import { RootState } from '../../api/store';
import { useSelector } from 'react-redux';
import ActionCatDropDown from '../component/tables/ActionCatDropDown';

interface Category {
  id: string;
  categoryName: string; // Adjusted to match your API response
  dateModified: string;
  createdBy: string;
  actions: string;
}

const CategoryTable: React.FC = () => {
  const columnHelper = createColumnHelper<Category>();
  const [data, setData] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/categories',
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Pass access token in headers
            }
      }); // Replace with your actual endpoint
        const categories = response.data.map((cat: any) => ({
          id: cat.id,
          categoryName: cat.categoryName,
          dateModified: new Date(cat.dateCreated).toLocaleString(),
          createdBy: cat.createdBy,
          actions: "Actions",
        }));
        setData(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures the request is made on component mount

  const columns = [
    columnHelper.accessor('id', {
      header: 'Category ID',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('categoryName', {
      header: 'Category Name',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('dateModified', {
      header: 'Date Modified',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('createdBy', {
      header: 'Created By',
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <ActionCatDropDown
          onEdit={handleEdit}
          onDelete={handleDelete}
          categoryId={info.row.original.id}
        />
      ),
    }),
  ];



  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return; // Prevent empty category
  
    try {
      console.log(accessToken)
      const response = await axios.post(`/api/v1/categories/${userId}`,
        {
          categoryName: newCategory, 
        }, 
         {
          headers: {
            Authorization: `Bearer ${accessToken}` 
          },
          
  
      });
     
  
      const createdCategory = response.data;
      const newCategoryObj: Category = {
        id: createdCategory.id, 
        categoryName: createdCategory.categoryName, 
        dateModified: new Date().toLocaleString(), 
        createdBy: createdCategory.createdBy, 
        actions: "Actions", 
      };
  
      setData((prev) => [...prev, newCategoryObj]); // Add new category to the data
      setNewCategory(''); // Clear the input field
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleEdit = async (categoryId: string) => {
    try {
      // Prompt the user for the new category name
      const updatedName = prompt('Edit Category Name:');
      
      // If the user cancels the prompt or enters an empty name, don't proceed
      if (!updatedName || updatedName.trim() === '') return;
  
      // Send the updated category name to the server
    const response = await axios.put(`/api/v1/categories/${categoryId}`, 
        { categoryName: updatedName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the required token for authentication
          },
        }
      );
  
      // Update the local state with the new category name
      const updatedCategory = response.data;
      
      setData((prevData) =>
        prevData.map((category) => 
          category.id === categoryId ? { ...category, categoryName: updatedCategory.categoryName } : category
        )
      );
      
      console.log('Category updated successfully:', updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  
  
  const handleDelete = async (categoryId: string) => {
    try {
      await axios.delete(`/api/v1/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Remove the deleted category from the data state
      setData((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  


  const table = useReactTable<Category>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  

  return (
    <div>
      
      <div className={styles.categoryTop}>
          <div style={{fontSize:"20px", fontWeight:"600", padding:"10px"}}>Category</div>
        <div style={{display:"block"}}>
          <div className={styles.catNew} onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ New'}
          
        </div>
        </div>
      {isAdding && (
        <div className={styles.addCat}>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className={styles.Catbtn} onClick={handleAddCategory}>
            Add 
          </div>
        </div>
      )}
      </div>
      <table className={styles.table}>
        <thead  >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHeaderCell} style={{padding:"15px"}}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr key={row.id}
                className={
                    i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }
                  >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell} style={{padding:"20px"}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.noRecordRow}>
              <td colSpan={5}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
        <div className={styles.paginationContainer}>
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className={styles.paginationButton}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className={styles.paginationButton}
          >
            {">"}
          </button>
  
          <span className={styles.pageInfo}>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
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

export default CategoryTable;