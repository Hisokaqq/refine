"use client";

import React, { useEffect, useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { BarLoader } from "react-spinners";
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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence, motion } from "framer-motion";

import {
  createWorkspace,
  deleteWorkspaces,
  getLastWorkspaces,
} from "@/app/actions/workspace.action";
import { useRouter } from "next/navigation";
import { shorteningText } from "@/utils/shorteningText";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

export function WorkspaceTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = useState<{
    [key: string]: boolean;
  }>({});
  
  const router = useRouter();
  const { workspaces, isLoading, error, fetchWorkspaces} = useWorkspaceStore()
  const [data, setData] = useState<Workspace[]>(workspaces);
  const { toast } = useToast();
  useEffect(() => {
    if (workspaces.length === 0) {
      fetchWorkspaces({});
    }
    else if(error){
      toast({
        variant: "destructive",
        title: "Error",
        description: error.toString(),
      });
      return
    } 
    setData(workspaces);

  }, [fetchWorkspaces, workspaces.length]);



  const handleDelete = async (ids: string[]) => {
    const { success } = await deleteWorkspaces(ids);
      setData((prevData) =>
        prevData.filter((workspace) => !ids.includes(workspace.id))
      );
      toast({
        variant: "destructive",
        title: "Workspace(s) Deleted",
        description: `${ids.length} Workspace(s) were deleted successfully`,
      });
    setRowSelection({});
  };

  const handleCreate = async () => {
    console.log("Workspace created");
    const { data, success, error } = await createWorkspace({
      title: "Workspace",
    });
    if (success && data) {
      router.push(`/workspace/${data.id}`);
      toast({
        title: "Created Workspace",
        description: "Now you can work here!",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.toString(),
      });
    }
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
        <Link href={`/workspace/${row.original.id}`} target="_blank">
          <Button variant="link" className="text-left pl-0">
            {shorteningText(row.getValue("title") as string, 60)}
          </Button>
        </Link>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="text-right">Date of Change</div>,
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as string;
        return (
          <div className="text-right">
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-2"></div>,
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
                <Link href={`/workspace/${workspace.id}`} target="_blank">
                  <DropdownMenuItem>View</DropdownMenuItem>
                </Link>
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

  const selectedRowIds = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => table.getRowModel().rows[parseInt(key)].original.id);

  const isDeleteButtonDisabled = selectedRowIds.length === 0;

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="absolute right-1/2 top-1/2 translate-x-[50%] ">
          <BarLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-4 items-center py-4">
            <Input
              placeholder="Filter titles..."
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="gap-2 flex">
              <Button size={"sm"} variant="outline" onClick={handleCreate}>
                Create
              </Button>
              <Button
                size={"sm"}
                variant="destructive"
                onClick={() => handleDelete(selectedRowIds)}
                disabled={isDeleteButtonDisabled}
              >
                Delete
              </Button>
            </div>
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
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <motion.tr
                        key={row.original.id} 
                        data-state={row.getIsSelected() && "selected"}
                        exit={{ scale: .8,  opacity: 0 }}
                        transition={{ duration: .2 }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="px-4 text-left">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
