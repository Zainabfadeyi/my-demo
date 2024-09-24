import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
  import { useEffect, useState } from "react";
  import DebouncedInput from "./DebouncedInput";
  import { CiSearch } from "react-icons/ci";
  import styles from "../../../styles/table.module.css";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../api/store";
import { useNavigate } from "react-router-dom";
import ActionInboxDropdown from "./ActionInboxDropDown";
import RejectMemo from "../functions/RejectMemo";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TiArrowUp } from "react-icons/ti";
import { GoArrowDown } from "react-icons/go";
  
  // Define the Document type
  interface Document {
    documentNo: string;
    dateCreated: string;
    subject: string;
    sender: string;
    recipient: string;
    createdBy: string;
    category:string;
    landmark:string;
    department:string;
    status: string;
    approvalLink: string;
    actions: string;
  }
  
  const TanStackTable = () => {
    const columnHelper = createColumnHelper<Document>();
    const navigate = useNavigate();
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [memoToReject, setMemoToReject] = useState<Document | null>(null);

  
    const columns = [
      columnHelper.accessor("documentNo", {
        header: "Document No",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("dateCreated", {
        header: "Date Created",
        cell: (info) => {
          const formattedDate = formatDateTimeForInput(info.getValue()) ;
          return <span>{formattedDate}</span>;
        },
      }),
      columnHelper.accessor("subject", {
        header: "Subject",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    
      columnHelper.accessor("createdBy", {
        header: "Created By",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      
      columnHelper.accessor("landmark", {
        header: "Location",
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
      columnHelper.accessor("approvalLink", {
        header: "Approval Link",
        cell: (info) => (
          <a
            onClick={() => {

              const { approvalLink} = info.row.original;
              navigate(`/reviewer${approvalLink}}`);
              console.log("approvallink", approvalLink)
            }}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            Link
          </a>
        ),
      }),
    
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <ActionInboxDropdown
          onReject={() => handleReject(info.row.original)}
          />
        ),
      }),
    ];
    const colors: { [key: string]: string } = {
      PENDING:"#9EC8DE",
      NEW:"#7EBAA6",
      RECEIVED:"green",
      REJECTED:"#DE615B"
 };
    
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [data, setData] = useState<Document[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchData = async () => {
      try {
          const response = await axios.get(`/api/v1/inbox/allMemos/${userId}`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`
              }
          });
          setData(response.data);
      } catch (error) {
          console.error("Error fetching memos:", error);
      }
  };

  // useEffect to fetch data on component mount and when userId or accessToken changes
  useEffect(() => {
      fetchData();
  }, [userId, accessToken]);
    
    const handleconfirmReject = async (documentNo: string) => {

      try {
        const response = await axios.put(`/api/v1/memo/reject/${documentNo}`, 
          {}, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}` 
            }
      });
        if (response.data) {
          
          console.log('Memo deleted successfully.');
          fetchData();
        } else {
          console.error('Failed to delete memo.');
        }
      } catch (error) {
        console.error('Error deleting memo:', error);
      } finally {
        setRejectModalOpen(false)
        setMemoToReject(null);
      }
    };
    const handleReject = (document: Document) => {
      setMemoToReject(document);  // Correct state update
      setRejectModalOpen(true);   // Open the modal
      console.log(isRejectModalOpen)
    };
    
  
    const handleCloseRejectModal = () => {
      setRejectModalOpen(false);
    };
    
    const handleDelete = (document:Document) => {
      console.log('View transaction:', document);
    };
   
  
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
      
    
      return formatted;
    };
    const [sorting, setSorting] = useState<SortingState>([]);
    
  
    const table = useReactTable<Document>({
      data,
      columns,
      state: {
        globalFilter,
        sorting
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel:getSortedRowModel(),
      onSortingChange:setSorting
    });
  
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.searchContainer}>
            <CiSearch />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value:any) => setGlobalFilter(String(value))}
            />
          </div>
        </div>
        <table className={styles.table}>
          <thead >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeaderCell}>
                    <div
                    className={`${
                      header.column.getCanSort() ? styles.sort : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span>
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ?  <TiArrowUp /> : <GoArrowDown />
                    ) : <RiArrowUpDownLine />}
                    </span>
                    </div>
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
                    <td key={cell.id} className={styles.tableInboxCell}>
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
        <RejectMemo
        isOpen={isRejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={() => memoToReject && handleconfirmReject(memoToReject.documentNo)}
        documentNo={memoToReject?.documentNo}
      />
      </div>
    );
  };
  
  export default TanStackTable;
  


  