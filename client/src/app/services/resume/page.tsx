import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start my-20 h-full w-full">
      <h1 className="text-3xl font-bold mb-8">Business  Service Page</h1>
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <Button> <a href="/services/resume/create">Create Resume</a></Button>
      </div>
    </main>
  )
}
