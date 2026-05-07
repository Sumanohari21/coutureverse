import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_60%)] blur-2xl" />
        <div className="absolute left-[-120px] top-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.25),transparent_55%)] blur-2xl" />
        <div className="absolute right-[-160px] top-[120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.18),transparent_55%)] blur-2xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="relative lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
            AI-powered digital fashion design
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl">
            Design couture in moments—
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
              generated, refined, and ready to wear.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
            Turn inspiration into runway-ready looks. Coutureverse pairs style intelligence with
            studio-grade controls—so every seam, drape, and detail feels intentional.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#start" className="inline-flex">
              <Button variant="primary" size="lg">
                Start Designing
              </Button>
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 backdrop-blur transition hover:bg-white/10"
            >
              Explore Featured Looks
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { k: "1-click", v: "Prompt to prototype" },
              { k: "Studio", v: "Precision refinement" },
              { k: "Export", v: "Share-ready visuals" },
            ].map((x) => (
              <div
                key={x.k}
                className="group rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur transition hover:border-white/20"
              >
                <p className="text-sm font-semibold text-zinc-50">
                  {x.k}
                  <span className="ml-2 inline-block h-1 w-1 rounded-full bg-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className="mt-1 text-sm text-zinc-300">{x.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              </div>
              <p className="text-xs font-semibold text-zinc-300">Couture Lab • Live Preview</p>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl">
              <div className="relative h-[360px] bg-gradient-to-b from-white/5 to-transparent p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.18),transparent_40%),radial-gradient(circle_at_45%_85%,rgba(250,204,21,0.12),transparent_40%)]" />

                <div className="relative h-full">
                  <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                    <p className="text-xs font-semibold text-zinc-200">Prompt</p>
                    <p className="mt-1 w-56 text-xs leading-relaxed text-zinc-300">
                      “Noir atelier—shadow-satin with neon edge lighting.”
                    </p>
                  </div>

                  <div className="absolute bottom-6 left-5 right-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur transition hover:border-white/20"
                        >
                          <div
                            className={`h-24 w-full rounded-xl bg-gradient-to-br from-cyan-400/25 via-fuchsia-400/20 to-amber-400/15 blur-0`} 
                          />
                          <div className="mt-3">
                            <p className="text-[11px] font-semibold text-zinc-200">
                              Look 0{i + 1}
                            </p>
                            <p className="mt-1 text-[11px] text-zinc-400">
                              Refine {i === 0 ? "Drape" : i === 1 ? "Seam" : "Glow"}
                            </p>
                          </div>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 animate-float-slow">
                    <Image
                      src="/file.svg"
                      alt="Fashion silhouette preview"
                      width={420}
                      height={420}
                      className="absolute bottom-[-70px] left-[-80px] opacity-70 dark:opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Texture", value: "Shadow-Satin" },
                { label: "Edge", value: "Neon Cyan" },
                { label: "Mood", value: "Noir Luxury" },
                { label: "Finish", value: "Studio Grade" },
              ].map((x, idx) => (
                <div
                  key={x.label}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur transition hover:bg-black/30"
                >
                  <p className="text-xs font-semibold text-zinc-400">{x.label}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-50">
                    {x.value}
                    <span
                      className="ml-2 inline-block h-1 w-1 rounded-full bg-fuchsia-300"
                      style={{ opacity: idx % 2 === 0 ? 0.9 : 0.6 }}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

