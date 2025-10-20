"use client"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useState, useEffect } from "react"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { get } from "http";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: ColumnFiltersState;
  hiddenColumns?: string[]; // Array of column IDs to hide
  columnVisibility?: VisibilityState; // Optional initial visibility state
}

export function DataTable<TData,TValue>({ 
  columns, 
  data,
  filters = [], 
  hiddenColumns = [], 
  columnVisibility: initialColumnVisibility 
}: DataTableProps<TData, TValue>) {
  
  // Create initial visibility state
  const getInitialVisibility = () => {
    if (initialColumnVisibility) return initialColumnVisibility;
    
    const visibility: VisibilityState = {};
    hiddenColumns.forEach(columnId => {
      visibility[columnId] = false;
    });
    return visibility;
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(getInitialVisibility());
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(filters)

  // Update filters when external filters change
  useEffect(() => {
    setColumnFilters(filters)
  }, [filters])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  })
 
  return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 rounded-md border overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
                {
                    table.getHeaderGroups().map((headerGroup)=>(
                        <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return(
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(                                                  
                                                header.column.columnDef.header,      
                                                header.getContext()
                                                  )}
                                        </TableHead>
                                    )}                            )}
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    table.getRowModel().rows?.length ?
                    (table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    <Link href={`/${String(row.getValue("type"))}/${String(row.getValue("id"))}`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Link>
                                </TableCell>
                            ))} 
                        </TableRow>
                    ))):(
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
          </Table>
        </div>
      </div>
  )}