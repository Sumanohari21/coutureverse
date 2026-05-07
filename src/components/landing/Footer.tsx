export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold text-zinc-50">Coutureverse</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              AI-powered digital fashion design—built for runway imagination.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { src: "/globe.svg", alt: "globe" },
                { src: "/next.svg", alt: "next" },
                { src: "/vercel.svg", alt: "vercel" },
              ].map((x) => (
                <div
                  key={x.alt}
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.src} alt={x.alt} className="h-5 w-5 opacity-90" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-50">Product</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Showcase",
                "Studio Tools",
                "Export",
                "Integrations",
              ].map((t) => (
                <li key={t}>
                  <a href="#" className="text-zinc-400 transition hover:text-zinc-50">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-50">Studio</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Careers",
                "About",
                "Press",
                "Contact",
              ].map((t) => (
                <li key={t}>
                  <a href="#" className="text-zinc-400 transition hover:text-zinc-50">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-50">Resources</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Guides",
                "Community",
                "FAQ",
              ].map((t) => (
                <li key={t}>
                  <a href="#" className="text-zinc-400 transition hover:text-zinc-50">{t}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Coutureverse. Frontend-only demo.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-zinc-500 transition hover:text-zinc-50">Privacy</a>
            <a href="#" className="text-zinc-500 transition hover:text-zinc-50">Terms</a>
            <a href="#" className="text-zinc-500 transition hover:text-zinc-50">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

