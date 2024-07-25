import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useState } from "react";
  import { DOCUMENTS } from "../../../data";
  import DebouncedInput from "./DebouncedInput";
  import { CiSearch } from "react-icons/ci";
  import styles from "../../../styles/table.module.css";
  
  // Define the Document type
  interface Document {
    documentNo: string;
    dateCreated: string;
    subject: string;
    from: string;
    recipient: string;
    createdBy: string;
    status: string;
    approvalLink: string;
    actions: string;
  }
  
  const TanStackTable = () => {
    const columnHelper = createColumnHelper<Document>();
  
    const columns = [
      columnHelper.accessor("documentNo", {
        header: "Document No",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("dateCreated", {
        header: "Date Created",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("subject", {
        header: "Subject",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("from", {
        header: "From",
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
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("approvalLink", {
        header: "Approval Link",
        cell: (info) => <a href={info.getValue()}>Link</a>,
      }),
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <div>
            <button className={styles.textBlue}>Edit</button>
            <button className={styles.textRed}>Delete</button>
          </div>
        ),
      }),
    ];
  
    const [data] = useState(() => [...DOCUMENTS]);
    const [globalFilter, setGlobalFilter] = useState("");
  
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
  
  export default TanStackTable;
  
  