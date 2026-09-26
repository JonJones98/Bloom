import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResumeServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full px-4 bg-gradient-to-br from-[#FEBC2F]/15 via-white to-[#FEBC2F]/5">
      <div className="max-w-5xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FEBC2F] to-[#d9a225] bg-clip-text text-transparent">
            Build Your Professional Resume
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Create a standout resume in minutes with our step-by-step builder. Choose from professional templates and customize every detail.
          </p>
        </div>

        {/* Main CTA */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
            <Link href="/services/resume/create">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FEBC2F]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FEBC2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Step-by-Step</h3>
            <p className="text-neutral-600">
              Follow our guided 7-part process to build your resume section by section with live preview.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FEBC2F]/15 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#d9a225]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
            <p className="text-neutral-600">
              See your resume update in real-time as you type. What you see is what you get.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FEBC2F]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#c79100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Save & Update</h3>
            <p className="text-neutral-600">
              Save your resume to the cloud and update it anytime. Access it from anywhere.
            </p>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">Already have a resume?</p>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/services/resume/render">View by ID</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services/resume/update">Update by ID</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
