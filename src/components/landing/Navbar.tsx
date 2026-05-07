import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { navLinks } from "./sections";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-400/30 via-fuchsia-400/20 to-transparent opacity-70 blur-md" />
        <span className="relative font-mono text-sm font-semibold tracking-wider text-zinc-50">
          CV
        </span>
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-medium tracking-widest text-zinc-400">AI</p>
        <p className="text-sm font-semibold text-zinc-50">Coutureverse</p>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" aria-label="Coutureverse home">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#showcase"
                className="hidden text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50 sm:inline"
              >
                Discover
              </a>
              <a href="#" className="hidden sm:inline-flex">
                <Button variant="secondary" size="md">Log in</Button>
              </a>
              <a href="#start" className="hidden sm:block">
                <Button variant="primary" size="md">Start Designing</Button>
              </a>

              <details className="lg:hidden">
                <summary className="list-none cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-50">
                  Menu
                </summary>
                <div className="mt-2 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur">
                  <div className="flex flex-col gap-3">
                    {navLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50"
                      >
                        {l.label}
                      </Link>
                    ))}
                    <a href="#start" className="pt-2">
                      <Button variant="primary" size="md" className="w-full justify-center">
                        Start Designing
                      </Button>
                    </a>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

