import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import "./basic-table.css";
import { COLUMNS } from "./columns";

export const SortTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInsance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    footerGroups,
    prepareRow,
  } = tableInsance;

  return (
    <div>
      <h1>BasicTable</h1>
      <table id="customers" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                console.log({ column });
                return (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "up"
                        : "down"
                      : ""}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => {
            return (
              <tr key={footerGroup.id} {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => {
                  return (
                    <td key={column.id} {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tfoot>
      </table>
    </div>
  );
};
