"use client";

import * as React from "react";
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Workspace = {
  id: string;
  title: string;
  dateOfChange: Date;
};

const initialWorkspaces: Workspace[] = [
  { id: "1", title: "Refine Project", dateOfChange: new Date("2024-07-10") },
  { id: "2", title: "E-commerce Platform", dateOfChange: new Date("2024-07-09") },
  { id: "3", title: "Social Media App", dateOfChange: new Date("2024-07-08") },
  { id: "4", title: "Project Management Tool", dateOfChange: new Date("2024-07-07") },
  { id: "5", title: "Blog Website", dateOfChange: new Date("2024-07-06") },
  { id: "6", title: "Portfolio Site", dateOfChange: new Date("2024-07-05") },
  { id: "7", title: "Financial Dashboard", dateOfChange: new Date("2024-07-04") },
  { id: "8", title: "Customer Support System", dateOfChange: new Date("2024-07-03") },
  { id: "9", title: "Marketing Analytics", dateOfChange: new Date("2024-07-02") },
  { id: "10", title: "HR Management System", dateOfChange: new Date("2024-07-01") },
];

export function WorkspaceTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<{ [key: string]: boolean }>({});
  const [data, setData] = React.useState<Workspace[]>(initialWorkspaces);

  const router = useRouter();

  const handleDelete = (ids: string[]) => {
    setData((prevData) => prevData.filter((workspace) => !ids.includes(workspace.id)));
    setRowSelection({});
  };

  const columns: ColumnDef<Workspace>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Button variant="link" className="text-left pl-0" onClick={() => router.push(`/workspace/${row.original.id}`)}>
          {row.getValue("title")}
        </Button>
      ),
    },
    {
      accessorKey: "dateOfChange",
      header: () => <div className="text-right">Date of Change</div>,
      cell: ({ row }) => {
        const date = row.getValue("dateOfChange") as Date;
        return <div className="text-right">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-2">Actions</div>,
      enableHiding: false,
      cell: ({ row }) => {
        const workspace = row.original;

        return (
          <div className="text-right pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/workspace/${workspace.id}`)}>
                  View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete([workspace.id])}>
                  <span className="text-red-600">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
  const isDeleteButtonDisabled = selectedRowIds.length === 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button 
          variant="destructive" 
          onClick={() => handleDelete(selectedRowIds)}
          disabled={isDeleteButtonDisabled}
        >
          Delete
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 text-left">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
