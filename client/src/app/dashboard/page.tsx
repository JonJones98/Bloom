"use client"

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/contexts/data-table";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"
import sample_data from '../../../sample_data.json';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/contexts/buttonVariants";
export type Documents = {
  id: string,
  name: string,
  type: string,
  detail: string,
  date_created: string,
  date_modified: string
}

export const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "type_icon",
    header: ""
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "detail",
    header: "Details",
  },
  {
    accessorKey: "date_modified",
    header: "Date",
  },
  {
    accessorKey: "id"
  },
  {
    accessorKey: "type"
  },
]

export default function Home() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const data = sample_data.documents; // Direct access since we're client-side now
  return (
    //Option 1
    // <main className="flex flex-row items-center h-full w-full p-8">
    //   <div className=" flex flex-row gap-8 w-full h-full">
    //     <div className="grid grid-cols-1 w-full ">
    //       <Card className="shadow-lg">
    //         <CardHeader>
    //           <CardTitle>Recents</CardTitle>
    //         </CardHeader>
    //         <CardContent >
    //           <DataTable columns={columns} data={data} hiddenColumns={['id', 'type']} />
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
    //       <Card className="w-full shadow-lg flex items-center justify-center">
    //         <CardHeader>
    //           <CardTitle>Resume</CardTitle>
    //         </CardHeader>
    //       </Card>
    //       <Card className="w-full shadow-lg flex items-center justify-center">
    //         <CardHeader>
    //           <CardTitle>Business Card</CardTitle>
    //         </CardHeader>
    //       </Card>
    //       <Card className="w-full shadow-lg flex items-center justify-center">
    //         <CardHeader>
    //           <CardTitle>Budget</CardTitle>
    //         </CardHeader>
    //       </Card>
    //       <Card className="w-full shadow-lg flex items-center justify-center">
    //         <CardHeader>
    //           <CardTitle>Business Plan</CardTitle>
    //         </CardHeader>
    //       </Card>
    //     </div>
    //   </div>   
    // </main>
    //Option 2
    // <main className="flex flex-row items-center h-full w-full p-8">
    //   <div className=" flex flex-row gap-8 w-full h-full">
    //     <div className="grid grid-cols-1 w-full ">
    //       <Card className="shadow-lg overflow-auto">
    //         <CardHeader>
    //           <CardTitle>Recents</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <DataTable columns={columns} data={data} hiddenColumns={['id', 'type']} />
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
    //        <div className="w-full shadow-lg flex items-center justify-center border-radius-50">
    //        <Button variant={"outline"} asChild className="w-full h-full">
    //            <Link href="/services/resume">Resume</Link>
    //        </Button>
    //        </div>
    //        <div className="w-full shadow-lg flex items-center justify-center">
    //        <Button variant={"outline"} asChild className="w-full h-full">
    //            <Link href="/services/business-card">Business Card</Link>
    //        </Button>
    //        </div>
    //        <div className="w-full shadow-lg flex items-center justify-center">
    //        <Button variant={"outline"} asChild className="w-full h-full">
    //            <Link href="/services/budget">Budget</Link>
    //        </Button>
    //        </div>
    //        <div className="w-full shadow-lg flex items-center justify-center">
    //        <Button variant={"outline"} asChild className="w-full h-full">
    //            <Link href="/services/business-plan">Business Plan</Link>
    //        </Button>
    //     </div>
    //   </div>  
    //   </div>  
    // </main>
    //Option 3
    <main className="h-full w-full p-6">
      <div className=" flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row justify-between items-center w-full h-fit">
      <h1 className="text-3xl font-bold">Dashboard</h1>
        <Popover>
             <PopoverTrigger>
               <div className={buttonVariants({ variant: "outline" })}>+</div>
             </PopoverTrigger>
             <PopoverContent>
               <div className="flex flex-col gap-2">
                   <Link href="/services/resume/create" className="hover:bg-gray-100 p-2 rounded">Resume</Link>
                   <Link href="/services/business-card/create" className="hover:bg-gray-100 p-2 rounded">Business Card</Link>
                   <Link href="/services/budget/create" className="hover:bg-gray-100 p-2 rounded">Budget</Link>
                   <Link href="/services/business-plan/create" className="hover:bg-gray-100 p-2 rounded">Business Plan</Link>
               </div>
             </PopoverContent>
      </Popover>
      </div>  
      <div className=" flex flex-row gap-4 w-full h-full">
        <div className="flex flex-col h-full gap-4 w-1/4">
           <div className="w-full h-full shadow-lg flex items-center justify-center rounded-md">
           <Button variant={"outline"} asChild className="w-full h-full">
               <Link href="/services/resume">Resume</Link>
           </Button>
           </div>
           <div className="min-w-fit w-full h-full shadow-lg flex items-center justify-center rounded-md">
           <Button variant={"outline"} asChild className="w-full h-full">
               <Link href="/services/business-card">Business Card</Link>
           </Button>
           </div>
           <div className="min-w-fit w-full h-full shadow-lg flex items-center justify-center rounded-md">
           <Button variant={"outline"} asChild className="w-full h-full">
               <Link href="/services/budget">Budget</Link>
           </Button>
           </div>
           <div className="min-w-fit w-full h-full shadow-lg flex items-center justify-center rounded-md">
           <Button variant={"outline"} asChild className="w-full h-full">
               <Link href="/services/business-plan">Business Plan</Link>
           </Button>
        </div>
      </div> 
        <div className=" flex flex-col w-full h-full gap-4">
          <div className="flex gap-4 h-fit">
            <Input
              placeholder="Search Doucuments..."
              className="flex-1"
              onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  setColumnFilters(prev => [
                    ...prev.filter(filter => filter.id !== "name"),
                    ...(value ? [{ id: "name", value },{ id: "detail", value }] : [])
                  ]);
              }}
            />
            <Popover>
          <PopoverTrigger>
            <div className={buttonVariants({ variant: "outline" })}>Preset Filters</div>
          </PopoverTrigger>
            <PopoverContent>
          <div className="flex gap-2 mb-4 flex-wrap w-fit">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setColumnFilters([{ id: "type", value: "business_card" }])}
            >
              Business Cards
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setColumnFilters([{ id: "type", value: "resume" }])}
            >
              Resumes
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setColumnFilters([
                { id: "type", value: "plan" }
              ])}
            >
              Business Plans
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setColumnFilters([
                { id: "type", value: "budget" }
              ])}
            >
              Budgets
            </Button>
          </div>
          </PopoverContent>
          </Popover>
            <Button 
              variant="outline" 
              onClick={() => setColumnFilters([])}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
          <Card className="shadow-lg flex flex-col w-full h-[80vh] overflow-hidden">
            <CardHeader className="">
              <CardTitle>Recents</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <DataTable 
                columns={columns} 
                data={data} 
                hiddenColumns={['id', 'type']} 
                filters={columnFilters}
              />
            </CardContent>
          </Card>
        </div>
         
      </div>
      </div>  
    </main>
    //Option 4
    // <main className="flex flex-row items-center h-full w-full p-8">
    //   <div className=" flex flex-row sm:flex-col gap-8 w-full h-full">
        
    //     <div className="flex gap-8 w-full">
    //       <div className="w-full shadow-lg flex items-center justify-center border-radius-50">
    //       <Button variant={"outline"} asChild className="w-full">
    //           <Link href="/services/resume">Resume</Link>
    //       </Button>
    //       </div>
    //       <div className="w-full shadow-lg flex items-center justify-center">
    //       <Button variant={"outline"} asChild className="w-full">
    //           <Link href="/services/business-card">Business Card</Link>
    //       </Button>
    //       </div>
    //       <div className="w-full shadow-lg flex items-center justify-center">
    //       <Button variant={"outline"} asChild className="w-full">
    //           <Link href="/services/budget">Budget</Link>
    //       </Button>
    //       </div>
    //       <div className="w-full shadow-lg flex items-center justify-center">
    //       <Button variant={"outline"} asChild className="w-full">
    //           <Link href="/services/business-plan">Business Plan</Link>
    //       </Button>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 w-full ">
    //       <Card className="shadow-lg">
    //         <CardHeader>
    //           <CardTitle>Recents</CardTitle>
    //         </CardHeader>
    //         <CardContent >
    //           <DataTable columns={columns} data={data} hiddenColumns={['id', 'type']} />
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>   
    // </main>
    //Option 5
    // <main className="flex flex-row items-center h-full w-full p-8">
    //   <div className=" flex flex-row gap-8 w-full h-full">
    //     <div className="grid grid-cols-1 w-full ">
    //       <div className="flex flex-row gap-4 items-center h-fit">
    //       <Popover>
    //         <PopoverTrigger>
    //           <Button variant="outline" className="rounded-full border-2 border-blue w-fit h-fit">+</Button>
    //         </PopoverTrigger>
    //         <PopoverContent>
    //           <div className="flex flex-col gap-2">
    //             <Button variant={"ghost"} asChild className="w-full">
    //               <Link href="/services/resume">Resume</Link>
    //             </Button>
    //             <Button variant={"ghost"} asChild className="w-full">
    //               <Link href="/services/business-card">Business Card</Link>
    //             </Button>
    //             <Button variant={"ghost"} asChild className="w-full">
    //               <Link href="/services/budget">Budget</Link>
    //             </Button>
    //             <Button variant={"ghost"} asChild className="w-full">
    //               <Link href="/services/business-plan">Business Plan</Link>
    //             </Button>
    //           </div>
    //         </PopoverContent>
    //       </Popover>
    //       <h1 className="text-2xl font-bold">Dashboard</h1>
    //       </div>
    //       <Card className="shadow-lg">
    //         <CardContent >
    //           <DataTable columns={columns} data={data} hiddenColumns={['id', 'type']} />
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>   
    // </main>
  );
}
