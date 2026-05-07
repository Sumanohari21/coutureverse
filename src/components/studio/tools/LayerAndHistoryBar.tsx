"use client";

import { useMemo } from "react";
import { useStudioDispatch, useStudioState } from "../state/StudioStateProvider";

export function LayerAndHistoryBar({ selectedId }: { selectedId: string | null }) {
  const { elements, selectedId: stateSelectedId } = useStudioState();
  const dispatch = useStudioDispatch();
  const effectiveSelectedId = selectedId ?? stateSelectedId;

  const hasSelection = useMemo(() => !!effectiveSelectedId, [effectiveSelectedId]);

  const selectedIndex = useMemo(() => {
    if (!effectiveSelectedId) return -1;
    return [...elements].sort((a, b) => a.zIndex - b.zIndex).findIndex((e) => e.id === effectiveSelectedId);
  }, [elements, effectiveSelectedId]);

  const sorted = useMemo(() => [...elements].sort((a, b) => a.zIndex - b.zIndex), [elements]);
  const minZ = sorted.length ? sorted[0].zIndex : 0;
  const maxZ = sorted.length ? sorted[sorted.length - 1].zIndex : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-xs font-semibold tracking-widest text-zinc-400">LAYER & HISTORY</p>

      <div className="mt-4 grid gap-2">
        <button
          className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35 disabled:opacity-50"
          disabled={!hasSelection}
          onClick={() => dispatch({ type: "LAYER", payload: { id: effectiveSelectedId, direction: "back" } })}
        >
          Send to back
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35 disabled:opacity-50"
          disabled={!hasSelection}
          onClick={() => dispatch({ type: "LAYER", payload: { id: effectiveSelectedId, direction: "backward" } })}
        >
          Move back
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35 disabled:opacity-50"
          disabled={!hasSelection}
          onClick={() => dispatch({ type: "LAYER", payload: { id: effectiveSelectedId, direction: "forward" } })}
        >
          Move forward
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35 disabled:opacity-50"
          disabled={!hasSelection}
          onClick={() => dispatch({ type: "LAYER", payload: { id: effectiveSelectedId, direction: "front" } })}
        >
          Bring to front
        </button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-xs font-semibold tracking-widest text-zinc-400">UNDO / REDO</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35"
            onClick={() => dispatch({ type: "UNDO", payload: {} })}
          >
            Undo
          </button>
          <button
            className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-black/35"
            onClick={() => dispatch({ type: "REDO", payload: {} })}
          >
            Redo
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">
          Shortcuts: Ctrl/Cmd+Z (undo), Ctrl/Cmd+Shift+Z (redo), Ctrl/Cmd+Y (redo).
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-xs font-semibold text-zinc-200">Inspector (stub)</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          Selection index: {selectedIndex >= 0 ? selectedIndex + 1 : "—"}
          <br />
          zIndex range: {minZ} .. {maxZ}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Fabric type, texture, dye colors, gradient and material properties are
          reserved for future UI.
        </p>
      </div>
    </div>
  );
}

