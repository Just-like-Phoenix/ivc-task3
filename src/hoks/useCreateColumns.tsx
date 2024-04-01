import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Peoples } from "../types/Peoples";
import TableCheckbox from "../components/Table/TableCheckboxComponent";

export function useCreateColumns() {
  const columns = useMemo<ColumnDef<Peoples>[]>(
    () => [
      {
        accessorKey: "Checkbox",
        id: "checkbox",
        header: (props) => (
          <TableCheckbox
            {...{
              checked: props.table.getIsAllRowsSelected(),
              indeterminate: props.table.getIsSomeRowsSelected(),
              onChange: props.table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
        enableSorting: false,
      },
      {
        accessorFn: (row) => row.id,
        id: "id",
        cell: (info) => info.getValue(),
        header: () => <span>ID</span>,
        sortingFn: "auto",
      },
      {
        accessorFn: (row) => row.firstName,
        id: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
        sortingFn: "auto",
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        sortingFn: "auto",
      },
      {
        accessorFn: (row) => row.age,
        id: "age",
        cell: (info) => info.getValue(),
        header: () => <span>Age</span>,
        sortingFn: "auto",
      },
    ],
    []
  );

  return columns;
}
