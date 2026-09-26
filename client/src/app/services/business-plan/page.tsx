import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BusinessPlanServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full px-4 bg-gradient-to-br from-[#F56849]/15 via-white to-[#F56849]/5">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#F56849] to-[#d9593d] bg-clip-text text-transparent">
            Build a Clear Business Plan
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Define your strategy, operations, and growth roadmap with a structured planning workflow.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
            <Link href="/services/business-plan/create">Create Business Plan</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Vision & Mission</h3>
            <p className="text-neutral-600">Document the core purpose and long-term direction of your company.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Market Strategy</h3>
            <p className="text-neutral-600">Outline audience, positioning, and channels for sustainable growth.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Execution Plan</h3>
            <p className="text-neutral-600">Turn goals into milestones with clear deliverables and timelines.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 border-t border-neutral-200">
          <Button variant="outline" asChild>
            <Link href="/services/business-plan/render">View by ID</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services/business-plan/update">Update by ID</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
