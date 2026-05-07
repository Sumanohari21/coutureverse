"use client";

import { useMemo } from "react";
import { materials, type FabricMaterialId } from "./data/materialLibrary";
import { MaterialTile } from "./MaterialTile";
import { useStudioDispatch, useStudioState } from "../state/StudioStateProvider";



export function MaterialLibraryPanel() {
  const { elements, selectedId } = useStudioState();
  const dispatch = useStudioDispatch();

  const effectiveSelectedId = selectedId;
  const selectedElement = useMemo(
    () => (effectiveSelectedId ? elements.find((e) => e.id === effectiveSelectedId) ?? null : null),
    [elements, effectiveSelectedId]
  );

  const hasSelection = !!selectedElement;

  const currentMaterialId: FabricMaterialId | null = useMemo(() => {
    if (!selectedElement) return null;
    // We store only fabricType in state; map back to a stable material id for UI.
    // For now, the mapping is 1:1 for our supported materials.
    const fabricType = selectedElement.fabricCustomization.fabricType;
    const found = materials.find((m) => m.fabricType === fabricType);
    return found?.id ?? null;
  }, [selectedElement]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-xs font-semibold tracking-widest text-zinc-400">MATERIAL LIBRARY</p>

      <p className="mt-2 text-xs leading-relaxed text-zinc-500">
        {hasSelection ? "Pick a material to update the selected element." : "Select an element on the canvas."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {materials
          .filter((m) => ["silk", "velvet", "leather", "satin", "denim", "metallic"].includes(m.id))
          .map((m) => (
            <MaterialTile
              key={m.id}
              materialId={m.id}
              name={m.name}
              preview={m.texturePreview(m.shineLevel)}
              isSelected={currentMaterialId === m.id}
              disabled={!hasSelection}
              onPick={() => {
                if (!effectiveSelectedId) return;
                dispatch({
                  type: "APPLY_MATERIAL",
                  payload: { id: effectiveSelectedId, materialId: m.id },
                });
              }}
            />
          ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3">
        <p className="text-[11px] font-semibold text-zinc-200">Future-ready</p>
        <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">
          Color & texture systems can be layered on top of this material selection.
        </p>
      </div>
    </div>
  );
}

