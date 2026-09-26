import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BusinessCardAltServicePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full px-4 bg-gradient-to-br from-[#719169]/15 via-white to-[#719169]/5">
      <div className="max-w-5xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#719169] to-[#5f7c57] bg-clip-text text-transparent">
            Craft Your Business Card
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Design professional business cards with advanced customization. Stand out with unique styles and instant QR codes.
          </p>
        </div>

        {/* Main CTA */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
            <Link href="/services/business-card/create">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Card
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#719169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
            <p className="text-neutral-600">
              Select from four distinct card styles and five color schemes to match your brand identity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/15 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#5f7c57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant QR Codes</h3>
            <p className="text-neutral-600">
              Generate vCard QR codes with one click for seamless digital contact sharing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#719169]/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#4f6849]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Export & Save</h3>
            <p className="text-neutral-600">
              Save your cards to the cloud and export them anytime for printing or digital use.
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
