import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BudgetPlannerServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full px-4 bg-gradient-to-br from-[#8C7BF9]/15 via-white to-[#8C7BF9]/5">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#8C7BF9] to-[#7566d6] bg-clip-text text-transparent">
            Plan Your Budget With Confidence
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Track spending, forecast monthly costs, and keep your financial goals on target.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
            <Link href="/services/budget-planner/create">Create Budget Plan</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Monthly Tracking</h3>
            <p className="text-neutral-600">Monitor income, fixed costs, and variable expenses in one view.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Category Insights</h3>
            <p className="text-neutral-600">Break down spending by category to identify savings opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Updates</h3>
            <p className="text-neutral-600">Save plans and revise them as your priorities change.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 border-t border-neutral-200">
          <Button variant="outline" asChild>
            <Link href="/services/budget-planner/render">View by ID</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services/budget-planner/update">Update by ID</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
