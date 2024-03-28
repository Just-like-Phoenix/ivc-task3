import { createColumnHelper } from "@tanstack/react-table";

export function ColumnDef(data: any[], keys: string[]) {
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
