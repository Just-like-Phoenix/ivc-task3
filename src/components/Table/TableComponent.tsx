import {
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

const TableComponent = () => {
  const [tData, setTData] = React.useState<Peoples[]>([]);
  const [defColumns, setDefColumns] = React.useState<any[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPeoplesQuery();

  const table = useReactTable({
    data: tData,
    columns: defColumns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
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
  }, [table]);

  if (isLoading) return <Loader />;
  else
    return (
      <TableDiv>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id} $rowSelected={false}>
                {headerGroup.headers.map((header) => {
                  if (header.id === "selectCheckBox")
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: "5%" }}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </Th>
                    );
                  else
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        $colCount={headerGroup.headers.length - 1}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
