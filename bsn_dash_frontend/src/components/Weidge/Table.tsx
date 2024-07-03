"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import Pagination from "./Pagination";

// Define types for columns and data
export type Column<T> = {
  header: string; // Header name to display
  accessor: keyof T; // Key to access the data in each row
  visible?: boolean; // Whether the column is visible
  width?: string; // Width of the column
  fixed?: "left" | "right"; // Fixed positioning of the column (left or right)
  sortable?: boolean; // Optional: if the column is sortable
  render?: (value: any, row: T) => JSX.Element; // Optional: custom rendering function
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  sort?: {
    sortBy: keyof T | null;
    sortOrder: "asc" | "desc" | null;
  };
  onChangeSort?: (column: keyof T, sortOrder: "asc" | "desc") => void;
  onSelectRow?: (list:T[]) => void;
};

type GenericObject = {
  [key: string]: any;
};

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

// Define the generic table component
const Table: FC<TableProps<GenericObject>> = ({
  columns,
  data,
  sort={sortBy:"",sortOrder:"desc"},
  onChangeSort,
  onSelectRow,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  // toggle to select a single row
  const toggleRowSelection = (rowIndex: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRows.delete(rowIndex);
    } else {
      newSelectedRows.add(rowIndex);
    }
    setSelectedRows(newSelectedRows);

    if (onSelectRow) {
      const selectedItems = data.filter((_,index)=>newSelectedRows.has(index));
      onSelectRow(selectedItems)
    }
  };
  // toggle to select all rows
  const toggleAllRowSelection = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onSelectRow) {
        onSelectRow([])
      }
    } else {
      const allRows = new Set(Array(data.length).keys());
      setSelectedRows(allRows);
      if (onSelectRow) {
        onSelectRow(data)
      }
    }
  };

  const handleSort = (column: keyof GenericObject) => {
    if (sort.sortBy === column) {
      const newSortOrder = sort.sortOrder === "asc" ? "desc" : "asc";
      if (onChangeSort) {
        onChangeSort(column, newSortOrder);
      }
    } else {
      if (onChangeSort) {
        onChangeSort(column, "asc");
      }
    }
  };


  return (
    <div>
      <div className="mt-8 flow-root py-4 ring-1 ring-gray-300">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative max-h-96">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="sticky z-10 top-0 bg-white">
                  <tr>
                    <th
                      scope="col"
                      className={`sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 ${onSelectRow ? "":"hidden"}`}
                    >
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={toggleAllRowSelection}
                        checked={selectedRows.size === data.length}
                      />
                    </th>

                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        style={{ width: column.width }} // Apply width
                        className={classNames(
                          "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                          column.fixed === "left" ?
                            "sticky left-0 bg-white z-20":"",
                          column.fixed === "right" ?
                            "sticky right-0 bg-white z-20":"",
                          index > 0 && columns[index - 1].fixed
                            ? "ml-[-1px]"
                            : ""
                        )}
                        onClick={() =>
                          column.sortable && handleSort(column.accessor)
                        }
                      >
                        <div className="flex items-center">
                          <span>{column.header}</span>
                          {/* {column.sortable && sort.sortBy === column.accessor && ( */}
                          {column.sortable && (
                            <span className="ml-1">
                              {sort.sortOrder === "asc" &&
                              sort.sortBy === column.accessor ? (
                                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={classNames("even:bg-gray-50")}
                    >
                      <td className={`relative px-7 sm:w-12 sm:px-6 ${onSelectRow ? "":"hidden"}`}>
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={() => toggleRowSelection(rowIndex)}
                          checked={selectedRows.has(rowIndex)}
                        />
                      </td>

                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ width: column.width }}
                          className={classNames(
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                            column.fixed === "left" ?
                              "sticky left-0 bg-white z-0":"",
                            column.fixed === "right" ?
                              "sticky right-0 bg-white z-0":"",
                            colIndex > 0 && columns[colIndex - 1].fixed
                              ? "ml-[-1px]"
                              : "" // Adjust for multiple fixed columns
                          )}
                        >
                          {column.render
                            ? column.render(row[column.accessor], row)
                            : row[column.accessor] || "--"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Export the component
export default Table;
