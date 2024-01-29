"use client";

import * as React from "react";

import { ChevronDown } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
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

const data: Event[] = [
  {
    events: "Transfer ERC-20 HonToken",
    average: 80,
    "Jun 1": 90,
    "Jun 2": 85,
    "Jun 3": 75,
    "Jun 4": 95,
    "Jun 5": 70,
    "Jun 6": 80,
    "Jun 7": 88,
  },
  {
    events: "Transfer ERC-20 HonToken",
    average: 75,
    "Jun 1": 80,
    "Jun 2": 70,
    "Jun 3": 85,
    "Jun 4": 78,
    "Jun 5": 92,
    "Jun 6": 68,
    "Jun 7": 77,
  },
  {
    events: "Transfer ERC-20 HonToken",
    average: 90,
    "Jun 1": 88,
    "Jun 2": 92,
    "Jun 3": 80,
    "Jun 4": 98,
    "Jun 5": 75,
    "Jun 6": 82,
    "Jun 7": 96,
  },
];

export type Event = {
  events: string;
  average: number;
  "Jun 1": number;
  "Jun 2": number;
  "Jun 3": number;
  "Jun 4": number;
  "Jun 5": number;
  "Jun 6": number;
  "Jun 7": number;
};

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="flex items-center justify-center"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "events",
    header: ({}) => {
      return (
        <div className="flex flex-row items-center cursor-pointer hover:opacity-60">
          Events (2)
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("events")}</div>
    ),
  },
  {
    accessorKey: "average",
    header: "Average",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("average")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 1",
    header: "Jun 1",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 1")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 2",
    header: "Jun 2",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 2")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 3",
    header: "Jun 3",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 3")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 4",
    header: "Jun 4",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 4")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 5",
    header: "Jun 5",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 5")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 6",
    header: "Jun 6",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 6")}
      </div>
    ),
  },
  {
    accessorKey: "Jun 7",
    header: "Jun 7",
    cell: ({ row }) => (
      <div className="text-center text-sm font-normal text-[#4A5568]">
        {row.getValue("Jun 7")}
      </div>
    ),
  },
];

export default function ChartEventsTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,

      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 align-middle text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
