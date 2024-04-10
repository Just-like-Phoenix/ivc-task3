import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Table, TableDiv, Td, Th, Tr } from "./StyledComponents";
import TablePaginationComponent from "./TablePaginationComponent";
import { useGetPeoplesQuery } from "../../api/peoplesApi";
import { Peoples } from "../../types/Peoples";
import { Loader } from "../Loader/LoaderComponent";
import { useAppDispatch, useAppSelector } from "../../hoks/storeHoks";
import { setSelectedTableData } from "../../slices/selectedTableDataSlice";
import { useCreateColumns } from "../../hoks/useCreateColumns";
import { ArrowUpIcon } from "../icons/ArrowUp";
import { ArrowDownIcon } from "../icons/ArrowDown";
import SearchComponent from "../Search/SearchComponent";

const TableComponent = () => {
  const [tData, setTData] = React.useState<Peoples[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPeoplesQuery();

  const table = useReactTable({
    data: tData,
    columns: useCreateColumns(),
    globalFilterFn: "includesString",
    state: {
      rowSelection,
      sorting,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (data !== undefined) {
      setTData(data);
    }
  }, [data]);

  useEffect(() => {
    dispatch(setSelectedTableData(rowSelection));
  }, [dispatch, rowSelection]);

  useEffect(() => {
    table.setPageSize(5);
  }, [table]);

  if (isLoading) return <Loader />;
  else
    return (
      <>
        <SearchComponent
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <TableDiv>
          <Table>
            <thead style={{ textAlign: "unset" }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr
                  key={headerGroup.id}
                  $rowSelected={table.getIsAllRowsSelected()}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        $colCount={headerGroup.headers.length}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "select-none cursor-pointer flex items-center gap-1"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ArrowUpIcon />,
                              desc: <ArrowDownIcon />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Tr
                    key={row.id}
                    onClick={(e) => {
                      row.toggleSelected();
                    }}
                    $rowSelected={row.getIsSelected()}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </tbody>
          </Table>
          <TablePaginationComponent table={table} />
        </TableDiv>
      </>
    );
};

export default TableComponent;
