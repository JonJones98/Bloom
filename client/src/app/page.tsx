import Link from "next/link";
import { Button } from "@/components/ui/button";

const serviceCards = [
  {
    label: "Resume Builder",
    href: "/services/resume",
    accent: "#FEBC2F",
    gradient: "from-[#FEBC2F]/20 via-white to-[#FEBC2F]/5",
    description: "Build polished resumes with a guided workflow, live preview, and styling controls.",
  },
  {
    label: "Business Cards",
    href: "/services/business-card",
    accent: "#719169",
    gradient: "from-[#719169]/20 via-white to-[#719169]/5",
    description: "Design modern cards with custom styles, QR codes, and export-ready layouts.",
  },
  {
    label: "Business Plan",
    href: "/services/business-plan",
    accent: "#F56849",
    gradient: "from-[#F56849]/20 via-white to-[#F56849]/5",
    description: "Outline goals, strategy, and execution plans in one structured workspace.",
  },
  {
    label: "Budget Planner",
    href: "/services/budget-planner",
    accent: "#8C7BF9",
    gradient: "from-[#8C7BF9]/20 via-white to-[#8C7BF9]/5",
    description: "Track budgets, organize spending, and plan with clearer financial visibility.",
  },
] as const;

const highlights = [
  {
    title: "Guided workflows",
    copy: "Move from blank page to finished document with focused, step-by-step builders.",
  },
  {
    title: "Live previews",
    copy: "See every update in real time so layout and content decisions feel immediate.",
  },
  {
    title: "Update anytime",
    copy: "Return to saved work, refine details, and keep documents current as needs change.",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-neutral-100 via-white to-neutral-100 px-4 py-6 lg:px-6">
      <div className="flex w-full flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black px-8 py-16 shadow-xl md:px-12 md:py-24">
          <div className="mx-auto flex min-h-[440px] max-w-5xl flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                Professional document creation
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
                  <span className="bg-gradient-to-r from-[#8C7BF9] via-[#F56849] via-[55%] to-[#FEBC2F] bg-clip-text text-transparent">
                    Bloom
                  </span>
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-white/75 md:text-2xl">
                  Create resumes, business cards, budgets, and planning documents in a clean workspace with live previews and guided flows.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="px-10 shadow-lg shadow-black/20">
                  <Link href="/services/resume/create">Start Building</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 px-10 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/dashboard">Open Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Services</p>
              <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">Choose your workflow</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group rounded-3xl border border-neutral-200 bg-gradient-to-br ${card.gradient} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <div
                  className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900/70"
                  style={{ backgroundColor: `${card.accent}20` }}
                >
                  Explore
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">{card.label}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{card.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold" style={{ color: card.accent }}>
                  Open service
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Why Bloom</p>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-4xl">
              One visual system across every document tool.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              Bloom gives each service its own personality while keeping the experience consistent. Start with a guided builder, review changes in real time, and move from creation to update without changing your workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/services/business-card/create">Create Business Card</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services/resume/create">Create Resume</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#8C7BF9]/12 via-[#F56849]/10 via-[55%] to-[#719169]/12 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">Quick access</p>
            <div className="mt-5 space-y-3">
              <Link href="/services/resume/render" className="block rounded-2xl border border-white/60 bg-white/70 p-4 text-sm font-medium text-neutral-800 transition hover:bg-white">
                View saved resume by ID
              </Link>
              <Link href="/services/resume/update" className="block rounded-2xl border border-white/60 bg-white/70 p-4 text-sm font-medium text-neutral-800 transition hover:bg-white">
                Update an existing resume
              </Link>
              <Link href="/services/business-card/render" className="block rounded-2xl border border-white/60 bg-white/70 p-4 text-sm font-medium text-neutral-800 transition hover:bg-white">
                View saved business card by ID
              </Link>
              <Link href="/services/business-card/update" className="block rounded-2xl border border-white/60 bg-white/70 p-4 text-sm font-medium text-neutral-800 transition hover:bg-white">
                Update an existing business card
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
