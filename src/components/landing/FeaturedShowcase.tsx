import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { featuredLooks } from "./sections";

function AccentGlow({ accent }: { accent: "cyan" | "fuchsia" | "gold" }) {
  const className =
    accent === "cyan"
      ? "from-cyan-400/30 via-fuchsia-400/10 to-transparent"
      : accent === "fuchsia"
        ? "from-fuchsia-400/30 via-cyan-400/10 to-transparent"
        : "from-amber-300/25 via-fuchsia-400/10 to-transparent";

  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${className} blur-xl opacity-70`}
    />
  );
}

export function FeaturedShowcase() {
  return (
    <section id="showcase" className="relative scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-zinc-400">
              FEATURED FASHION SHOWCASE
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Looks curated by AI—crafted for impact.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a href="#how" className="text-sm font-semibold text-zinc-300 hover:text-zinc-50">
              How it works
            </a>
            <span className="h-1 w-1 rounded-full bg-white/15" />
            <Button variant="secondary" size="md">View All</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLooks.map((look, idx) => (
            <Link
              key={look.id}
              href="#start"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <AccentGlow accent={look.accent} />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 opacity-80" />
                    <p className="text-xs font-semibold text-zinc-200">{look.category}</p>
                  </div>
                  <div className="text-xs font-semibold text-zinc-500">#{idx + 1}</div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-zinc-50">{look.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  {look.tagline}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((n) => (
                      <div
                        key={n}
                        className="h-8 w-8 rounded-full border border-white/10 bg-black/20 backdrop-blur"
                      />
                    ))}
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-zinc-300">
                    Generate Similar
                  </span>
                </div>

                <div className="relative mt-4 h-28 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.28),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(250,204,21,0.20),transparent_55%)]" />
                  <Image
                    src="/window.svg"
                    alt="Look thumbnail"
                    width={220}
                    height={140}
                    className="absolute -bottom-10 -left-10 opacity-80 transition-transform duration-500 group-hover:translate-y-[-10px]"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-zinc-400">
                    Tip: try refining <span className="text-zinc-200">drape</span> and <span className="text-zinc-200">edge</span>.
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div id="how" className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Describe the mood",
              body: "Use natural language prompts to set silhouette, texture, and atmosphere.",
            },
            {
              title: "Refine like a studio",
              body: "Adjust drape, seams, and edge lighting with control-ready parameters.",
            },
            {
              title: "Export & share",
              body: "Save previews for mood boards or present to collaborators—no friction.",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur"
              style={{ animationDelay: `${(i + 1) * 120}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-100">
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-zinc-50">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.body}</p>
            </div>
          ))}
        </div>

        <div id="pricing" className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-zinc-400">PRICING (MOCK)</p>
              <h3 className="mt-2 text-2xl font-semibold text-zinc-50">Start designing in seconds.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
                This is a frontend-only landing page. Actions are UI-only—no backend yet.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#start" className="inline-flex">
                <Button variant="primary" size="lg">
                  Start Designing
                </Button>
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-zinc-300 transition hover:text-zinc-50"
              >
                View plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

