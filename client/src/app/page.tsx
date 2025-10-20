import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col h-full w-full">
        <div className="flex flex-col mb-4 gap-5 items-center justify-center content-center bg-gray-50 w-full h-screen">
          <h1 className=" text-2xl font-bold">Welcome Screen</h1>
          <Button variant={"default"} asChild><Link href="/login">Signing In</Link></Button>
          </div>
    </main>
  );
}
