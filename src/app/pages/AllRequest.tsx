import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useEffect, useState } from "react";
  import DebouncedInput from "../component/tables/DebouncedInput";
  import { CiSearch } from "react-icons/ci";
  import styles from "../../styles/table.module.css";

import ActionDropdown from "../component/tables/ActionDropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../api/store";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
  
  // Define the Document type
  interface Document {
    documentNo: string;
    dateCreated: string;
    subject: string;
    recipient: string;
    createdBy: string;
    category:string;
    landmark:string;
    department:string;
    status: string;
    dateReceived:string;
    actions: string;
  }
  
  const MyRequest = () => {
    const columnHelper = createColumnHelper<Document>();
    const navigate = useNavigate();
  
    const columns = [
      columnHelper.accessor("documentNo", {
        header: "Document No",
        cell: (info) => (
          <a
            onClick={() => navigate(`/overview/${info.getValue()}`)}
            style={{ cursor: 'pointer', color: 'blue'}}
            className={styles.documentNo}
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("dateCreated", {
        header: "Date Created",
        cell: (info) =>  {
          const formattedDate = formatDateTimeForInput(info.getValue()) ;
          return <span>{formattedDate}</span>;
        },
      }),
      columnHelper.accessor("subject", {
        header: "Subject",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("recipient", {
        header: "Recipient",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("createdBy", {
        header: "Created By",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("department", {
        header: "Department",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <span style={{ backgroundColor: '#D0D4D8',padding: '6px', borderRadius: '10px', fontSize:"13px" }}>
            {info.getValue()}
          </span>
        ),
      }),
      

      columnHelper.accessor("status", {
        header: "status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={styles.categoryCell}
              style={{
                backgroundColor: colors[status] || 'none', 
                padding:"5px",
                fontWeight:"900",
                borderRadius:"10px",
                fontSize:"13px"
              }}
            >
              {status}
            </span>
          );
        },
      }),
      // columnHelper.accessor("dateReceived", {
      //   header: "Date Received",
      //   cell: (info) => {
      //     const dateReceived = info.getValue();
      //     // Only format if dateReceived is available, else return an empty string
      //     const formattedDate = dateReceived ? formatDateTimeForInput(dateReceived) : '';
      //     return <span>{formattedDate}</span>;
      //   },
      // }),

      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <ActionDropdown
            onView={() => handleView(info.row.original)}
            onDelete={() => handleDelete(info.row.original)}
          />
        ),
      }),
    ];
  
    const handleView = (document:Document) => {
        console.log('View transaction:', document);
      };
      
      const handleDelete = (document:Document) => {
        console.log('View transaction:', document);
      };
  
      const colors: { [key: string]: string } = {
        PENDING:"#9EC8DE",
        NEW:"#7EBAA6",
        RECEIVED:"#DE615B"
   };
    const [data, setData] = useState<Document[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const table = useReactTable<Document>({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const response = await axios.get(`/api/v1/memo/all`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}` 
              }
        });
          setData(response.data);
          // window.location.reload

        } catch (error) {
          console.error("Error fetching memos:", error);
        }
      };
  
      fetchData();
    }, []);

    const formatDateTimeForInput = (isoDateTime: string): string => {
      const date = new Date(isoDateTime);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
    
      // Get the hours and determine AM or PM
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';
    
      // Convert hours to 12-hour format
      hours = hours % 12 || 12;  // Converts '0' to '12' for midnight
    
      const formatted = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;
      console.log('Formatted DateTime:', formatted);
    
      return formatted;
    };
  
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchContainer}>
            <CiSearch style={{background:"#000"}} />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value:any) => setGlobalFilter(String(value))}
              
            />
          </div>
        </div>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeaderCell}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={
                    i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className={styles.noRecordRow}>
                <td colSpan={9}>No Record Found!</td>
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
  
  export default MyRequest;
  
  