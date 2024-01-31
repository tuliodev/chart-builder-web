"use client";

import * as React from "react";

import { format, parseISO } from "date-fns";
import { ChevronDown } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatasourceContext } from "@/contexts/Datasource";

interface SelectedOperation {
  id: string;
  operation: string;
  metric_display_name: string;
  contract_name: string;
  code: string;
  series: { x: string; y: number }[];
}

export type Event = {
  events: string;
  average: number;
  [key: string]: number | string;
};

interface ColumnData {
  key: string;
  x: string;
  y: number;
}

function transformSelectedOperationsToEvents(
  selectedOperations: SelectedOperation[],
): Event[] {
  return selectedOperations.map((operation) => {
    const seriesValues = operation.series.map((dataPoint: any) => dataPoint.y);
    const average = Math.floor(
      seriesValues.reduce((sum: number, value: number) => sum + value, 0) /
        seriesValues.length,
    );

    return {
      id: operation.code,
      events: `${operation.metric_display_name} ${operation.contract_name}`,
      average: isNaN(average) ? 0 : average,
      ...operation.series.reduce((acc: any, dataPoint: any) => {
        acc[format(parseISO(dataPoint.x), "MMM d")] = dataPoint.y;
        return acc;
      }, {}),
    };
  });
}

export default function ChartEventsTable() {
  const { selectedOperations, handleSelectedChartData } =
    React.useContext(DatasourceContext);

  const [currentColumns, setCurrentColumns] = React.useState<ColumnData[]>([]);

  React.useEffect(() => {
    if (selectedOperations.length > 0) {
      const newColumns: ColumnData[] = [];

      selectedOperations.forEach((operation) => {
        const formattedSeries = operation.series.map((dataPoint) => ({
          x: format(parseISO(dataPoint.x), "MMM d"),
          y: dataPoint.y,
          key: `${dataPoint.x}_${dataPoint.y}`,
        }));

        newColumns.push(...formattedSeries);
      });

      setCurrentColumns(newColumns);
    }
  }, [selectedOperations]);

  const handleOperationCheckbox = (
    checked: boolean,
    ids: string[],
    selectAll: boolean = false,
  ) => {
    handleSelectedChartData(ids, checked, selectAll);
  };

  const dynamicColumns: ColumnDef<Event>[] = React.useMemo(() => {
    const columns: ColumnDef<Event>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="flex items-center justify-center"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              handleOperationCheckbox(!!value, [], true);
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="flex items-center justify-center"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              if (typeof row.original.id !== "number") {
                handleOperationCheckbox(!!value, [row.original.id]);
              }
              row.toggleSelected(!!value);
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "events",
        header: ({}) => (
          <div className="flex flex-row items-center cursor-pointer hover:opacity-60 ml-2 w-[250px]">
            Events (2)
            <ChevronDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-left font-normal text-sm ml-2 text-primary-neutral">
            {row.getValue("events")}
          </div>
        ),
      },
      {
        accessorKey: "average",
        header: ({}) => <div className="w-[70px]">Average</div>,
        cell: ({ row }) => (
          <div className="text-right text-sm font-normal text-primary-neutral mr-2">
            {row.getValue("average")}
          </div>
        ),
      },
    ];

    if (currentColumns.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      currentColumns.forEach((col: ColumnData, index) => {
        columns.push({
          accessorKey: col.key,
          header: ({}) => <span className="px-5 text-center">{col.x}</span>,
          cell: ({ row }) => (
            <div className="text-right text-sm font-normal text-primary-neutral px-5">
              {row.original[col.x]}
            </div>
          ),
        });
      });
    }

    return columns;
  }, [currentColumns]);

  const transformedData = React.useMemo(() => {
    return transformSelectedOperationsToEvents(selectedOperations);
  }, [selectedOperations]);
  const initialRowSelection = React.useMemo(() => {
    const initialSelection: any = {};
    transformedData.forEach((row, index) => {
      initialSelection[index] = true;
    });
    return initialSelection;
  }, [transformedData]);

  const [rowSelection, setRowSelection] = React.useState(initialRowSelection);

  React.useEffect(() => {
    const newIndex = transformedData.length;
    setRowSelection((prevSelection: any) => ({
      ...prevSelection,
      [newIndex]: true,
    }));
  }, [transformedData]);

  const table = useReactTable({
    data: transformedData,
    columns: dynamicColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="max-w-screen-lg">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnId = header.column.id;
                const cellClassName = columnId === "average" ? "border-r" : "";

                return (
                  <TableHead key={header.id} className={cellClassName}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id;
                  const cellClassName =
                    columnId === "average" ? "border-r" : "";

                  return (
                    <TableCell key={cell.id} className={cellClassName}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={dynamicColumns.length}
                className="h-15 align-middle text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
