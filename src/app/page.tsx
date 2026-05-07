import { FeaturedShowcase } from "@/components/landing/FeaturedShowcase";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50">
      {/* Luxury background overlays */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12),transparent_40%),radial-gradient(circle_at_45%_90%,rgba(250,204,21,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:url('/file.svg')] bg-[length:420px_420px]" />
      </div>

      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <FeaturedShowcase />
        <div id="start" className="h-1" />
        <section id="pricing" className="relative scroll-mt-28">
          <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold tracking-widest text-zinc-400">
                    READY WHEN YOU ARE
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                    Start designing your next couture moment.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
                    This landing page is frontend-only. Buttons and cards are
                    designed for the future product flow.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <a href="#" className="inline-flex">
                      <button
                        className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_40px_rgba(236,72,153,0.25)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.55),0_0_60px_rgba(236,72,153,0.35)]"
                      >
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-black/80" />
                        Start Designing
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </a>
                    <a
                      href="#showcase"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition hover:bg-white/10"
                    >
                      View Showcase
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["No backend yet", "AI-style UI", "Luxury motion"].map((t, i) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <p className="text-sm font-semibold text-zinc-50">{t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      Crafted for a future product launch.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

