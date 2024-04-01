import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Peoples } from "../../types/Peoples";

export function createColumnDef(data: any[], keys: string[]) {
  let defColumns: any[] = [];

  type columnsType = typeof data;

  const columnHelper = createColumnHelper<columnsType>();

  keys.forEach((e) => {
    defColumns.push(
      columnHelper.accessor(e, {
        id: e,
        header: () => e,
        cell: (info) => info.renderValue(),
        sortingFn: "basic",
      })
    );
  });

  return defColumns;
}
