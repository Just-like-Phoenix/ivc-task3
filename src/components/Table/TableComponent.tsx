import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { SortIcon } from "../icons/Sort";
import { SelectIcon } from "../icons/Select";
import { UnselectIcon } from "../icons/Unselect";
import { useCreateColumns } from "../../hoks/useCreateColumns";
import { ArrowUpIcon } from "../icons/ArrowUp";
import { ArrowDownIcon } from "../icons/ArrowDown";

const TableComponent = () => {
  const [tData, setTData] = React.useState<Peoples[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPeoplesQuery();

  const table = useReactTable({
    data: tData,
    columns: useCreateColumns(),
    state: {
      rowSelection,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    );
};

export default TableComponent;
