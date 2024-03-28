import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Table, TableDiv, Td, Th, Tr } from "./StyledComponents";
import TablePaginationComponent from "./TablePaginationComponent";
import { useGetPeoplesQuery } from "../../api/peoplesApi";
import { Peoples } from "../../types/Peoples";
import { ColumnDef } from "../../features/Table/ColumnDef";
import { Loader } from "../Loader/LoaderComponent";
import { useAppDispatch, useAppSelector } from "../../hoks/storeHoks";
import { setSelectedTableData } from "../../slices/selectedTableDataSlice";
import { SortIcon } from "../icons/Sort";
import { SelectIcon } from "../icons/Select";
import { UnselectIcon } from "../icons/Unselect";

const TableComponent = () => {
  const [tData, setTData] = React.useState<Peoples[]>([]);
  const [defColumns, setDefColumns] = React.useState<any[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPeoplesQuery();

  const table = useReactTable({
    data: tData,
    columns: defColumns,
    state: {
      rowSelection,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (data !== undefined) {
      setTData(data);
      setDefColumns(ColumnDef(data, Object.keys(data[0])));
    }
  }, [data]);

  useEffect(() => {
    dispatch(setSelectedTableData(rowSelection));
  }, [dispatch, rowSelection]);

  useEffect(() => {
    table.setPageSize(5);
  }, []);

  useEffect(() => {
    console.log(table.getSortedRowModel());
  }, [sorting]);

  if (isLoading) return <Loader />;
  else
    return (
      <TableDiv>
        <Table>
          <thead style={{ textAlign: "unset" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                $rowSelected={table.getIsAllRowsSelected()}
              >
                {table.getIsAllRowsSelected() ? (
                  <UnselectIcon
                    onClick={(e) => table.toggleAllRowsSelected()}
                  />
                ) : (
                  <SelectIcon onClick={(e) => table.toggleAllRowsSelected()} />
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      $colCount={headerGroup.headers.length}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
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
                  <Td />
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
        <pre>{JSON.stringify(sorting, null, 2)}</pre>
      </TableDiv>
    );
};

export default TableComponent;
