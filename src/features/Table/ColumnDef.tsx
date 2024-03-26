import { createColumnHelper } from "@tanstack/react-table";
import TableCheckbox from "../../components/Table/TableCheckboxComponent";

export function ColumnDef(data: any[], keys: string[]) {
  let defColumns: any[] = [];

  type columnsType = typeof data;

  const columnHelper = createColumnHelper<columnsType>();

  defColumns.push(
    columnHelper.accessor("select", {
      id: "selectCheckBox",
      header: (props) => (
        <TableCheckbox
          {...{
            checked: props.table.getIsAllRowsSelected(),
            indeterminate: props.table.getIsSomeRowsSelected(),
            onChange: props.table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
    })
  );

  keys.forEach((e) => {
    defColumns.push(
      columnHelper.accessor(e, {
        id: e,
        header: () => e,
        cell: (info) => info.renderValue(),
      })
    );
  });

  return defColumns;
}
