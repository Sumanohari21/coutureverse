"use client";

import { useMemo, useState } from "react";
import { CategorySidebar } from "./sidebar/CategorySidebar";
import { StudioCanvas } from "./canvas/StudioCanvas";
import { LayerAndHistoryBar } from "./tools/LayerAndHistoryBar";
import { StudioStateProvider } from "./state/StudioStateProvider";
import type { StudioElement } from "./state/types";
import { MaterialLibraryPanel } from "./materials/MaterialLibraryPanel";


export function StudioApp() {
  // Placeholder for future AI assistant state (no backend yet)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const initialElements = useMemo<StudioElement[]>(
    () =>
      // empty canvas by default; elements are added by drag/drop
      [],
    []
  );

  return (
    <StudioStateProvider initialElements={initialElements}>
      <div className="relative min-h-screen bg-black text-zinc-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12),transparent_40%),radial-gradient(circle_at_45%_90%,rgba(250,204,21,0.10),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.85))]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:url('/file.svg')] bg-[length:420px_420px]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-10 pt-24 sm:px-6 lg:grid-cols-[280px_1fr_320px] lg:gap-6 lg:px-8">
          <aside className="lg:col-span-1">
            <CategorySidebar onPick={(id: string | null) => setSelectedId(id)} />
          </aside>



          <section className="lg:col-span-1">
            <StudioCanvas
              onSelect={(id) => setSelectedId(id)}
              selectedId={selectedId}
            />
          </section>

          <aside className="lg:col-span-1">
            <div className="space-y-4">
              <LayerAndHistoryBar selectedId={selectedId} />
              <MaterialLibraryPanel />
            </div>
          </aside>

        </div>
      </div>
    </StudioStateProvider>
  );
}

