"use client";

import { useMemo } from "react";
import type { TemplateId } from "../data/catalog";
import { categoryOrder, getTemplatesByCategory } from "../data/catalog";

export function CategorySidebar({

  onPick,
}: {
  onPick: (id: string | null) => void;
}) {
  const categories = useMemo(() => categoryOrder, []);

  const onDragStart = (e: React.DragEvent, templateId: TemplateId) => {
    e.dataTransfer.setData("application/x-template-id", templateId);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-widest text-zinc-400">
          CLOTHING CATEGORIES
        </p>
        <span className="text-xs font-semibold text-zinc-500">Drag to canvas</span>
      </div>

      <div className="mt-4 space-y-4">
        {categories.map((cat) => {
          const list = getTemplatesByCategory(cat);
          return (
            <section key={cat}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-100">{cat}</h3>
                <span className="text-xs text-zinc-500">{list.length}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {list.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, t.id)}
onClick={() => {
                      // Reserved for future inspector-based selection.
                      onPick(null);
                    }}
                    className="group relative cursor-grab rounded-2xl border border-white/10 bg-black/25 p-3 transition hover:border-white/25 active:cursor-grabbing"
                    title={`Add ${t.name}`}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.20),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(236,72,153,0.18),transparent_45%)]" />
                    <div className="relative h-8 w-full overflow-hidden rounded-xl border border-white/10 bg-black/30" />
                    <p className="relative mt-2 truncate text-[11px] font-semibold text-zinc-200">
                      {t.name}
                    </p>
                    <p className="relative mt-1 text-[10px] text-zinc-500">Drag</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-xs font-semibold text-zinc-200">Future-ready</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          Fabric type, texture, dye colors, gradient and material properties are
          stored per element for future customization.
        </p>
      </div>
    </div>
  );
}

