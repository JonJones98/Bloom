import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BusinessCardServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full px-4 bg-gradient-to-br from-[#719169]/15 via-white to-[#719169]/5">
      <div className="max-w-5xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#719169] to-[#5f7c57] bg-clip-text text-transparent">
            Design Your Business Card
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Create professional business cards with our intuitive designer. Customize styles, colors, and generate QR codes instantly.
          </p>
        </div>

        {/* Main CTA */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
            <Link href="/services/business-card/create">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Business Card
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#719169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Styles</h3>
            <p className="text-neutral-600">
              Choose from modern, classic, minimal, and creative designs with customizable color schemes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/15 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5f7c57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">QR Code Generation</h3>
            <p className="text-neutral-600">
              Automatically generate vCard QR codes for easy contact sharing and networking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#4f6849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Preview</h3>
            <p className="text-neutral-600">
              See your business card design update live as you make changes to content and styling.
            </p>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">Already have a card?</p>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/services/business-card/render">View by ID</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services/business-card/update">Update by ID</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
