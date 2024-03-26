import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { Table, TableDiv, Td, Th } from "./StyledComponents";
import TablePaginationComponent from "./TablePaginationComponent";
import { useGetPeoplesQuery } from "../../api/peoplesApi";
import { Peoples } from "../../types/Peoples";

const TableComponent = () => {
  const [data, setData] = React.useState<Peoples[]>([]);
  const [defColumns, setDefColumns] = React.useState<any[]>([]);
  const { data: tData, isSuccess, isError } = useGetPeoplesQuery();

  setData((e) => e.concat(tData));

  type columnsType = typeof tData;

  const columnHelper = createColumnHelper<columnsType>();
  //const tKeys = Object.keys();

  console.log(data);

  const table = useReactTable({
    data,
    columns: defColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(5);
  }, [table]);

  return (
    <TableDiv>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
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
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TablePaginationComponent table={table} />
    </TableDiv>
  );
};

export default TableComponent;
