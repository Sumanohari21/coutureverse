"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { TemplateId } from "../data/catalog";
import { createElementFromTemplate } from "../data/catalog";
import { useStudioDispatch, useStudioState } from "../state/StudioStateProvider";
import type { StudioElement } from "../state/types";
import { TransformHandles } from "./TransformHandles";
import { renderElementSvgDataUri } from "./renderElementSvgDataUri";






export function StudioCanvas({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { elements, selectedId: stateSelectedId } = useStudioState();

  const dispatch = useStudioDispatch();
  const effectiveSelectedId = selectedId ?? stateSelectedId;

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [dragState, setDragState] = useState<
    | null
    | {
        mode: "move" | "resize" | "rotate";
        id: string;
        startPointer: { x: number; y: number };
        startTransform: StudioElement["transform"];
        handle?: "nw" | "ne" | "sw" | "se";
      }
  >(null);

  const getCanvasPoint = useCallback((clientX: number, clientY: number) => {
    const el = canvasRef.current;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return {
      x: clientX - r.left,
      y: clientY - r.top,
    };
  }, []);

  const getMaxZ = useMemo(() => {
    return elements.reduce((m, e) => Math.max(m, e.zIndex), 0);
  }, [elements]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const templateId = e.dataTransfer.getData("application/x-template-id") as TemplateId;
      if (!templateId) return;

      const p = getCanvasPoint(e.clientX, e.clientY);
      const newId = `el_${Math.random().toString(16).slice(2)}_${Date.now()}`;

      const el = createElementFromTemplate({ templateId, id: newId, x: p.x, y: p.y });
      el.zIndex = getMaxZ + 1;
      dispatch({ type: "ADD", payload: { element: el } });
      dispatch({ type: "SELECT", payload: { id: el.id } });
    },
    [dispatch, getCanvasPoint, getMaxZ]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onPointerDownElement = useCallback(
    (e: React.PointerEvent, id: string) => {
      e.stopPropagation();
      if (!(e.currentTarget instanceof HTMLElement)) return;
      const el = elements.find((x) => x.id === id);
      if (!el) return;

      onSelect(id);
      dispatch({ type: "SELECT", payload: { id } });

      const p = getCanvasPoint(e.clientX, e.clientY);
      setDragState({
        mode: "move",
        id,
        startPointer: p,
        startTransform: { ...el.transform },
      });
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [dispatch, elements, getCanvasPoint, onSelect]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState) return;
      const p = getCanvasPoint(e.clientX, e.clientY);

      if (dragState.mode === "move") {
        const dx = p.x - dragState.startPointer.x;
        const dy = p.y - dragState.startPointer.y;

        const nextX = dragState.startTransform.x + dx;
        const nextY = dragState.startTransform.y + dy;

        dispatch({
          type: "MOVE",
          payload: {
            id: dragState.id,
            transform: { x: nextX, y: nextY },
          },
        });
      }
    },
    [dragState, dispatch, getCanvasPoint]
  );

  const onPointerUp = useCallback(() => {
    if (!dragState) return;
    dispatch({ type: "COMMIT", payload: {} });
    setDragState(null);
  }, [dispatch, dragState]);

  const selectedElement = useMemo(
    () => elements.find((e) => e.id === effectiveSelectedId) ?? null,
    [elements, effectiveSelectedId]
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-zinc-400">DESIGN CANVAS</p>
          <p className="mt-1 text-sm text-zinc-300">Drag elements in, then transform with handles.</p>
        </div>
        <div className="hidden sm:block text-xs text-zinc-500">Layered • Undoable • Future fabric-ready</div>
      </div>

      <div
        ref={canvasRef}
        className="mt-4 relative h-[640px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black/40 to-black/70"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => {
          onSelect(null);
          dispatch({ type: "SELECT", payload: { id: null } });
        }}
        role="application"
        aria-label="Fashion design canvas"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />

        {elements
          .slice()
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((el) => {
            const isSelected = el.id === effectiveSelectedId;
            const svgUri = renderElementSvgDataUri(el);

            return (
              <div
                key={el.id}
                className="absolute"
                style={{
                  left: el.transform.x,
                  top: el.transform.y,
                  width: el.transform.width,
                  height: el.transform.height,
                  transform: `rotate(${el.transform.rotationDeg}deg)`,
                  transformOrigin: "top left",
                  zIndex: el.zIndex,
                }}
                onPointerDown={(e) => onPointerDownElement(e, el.id)}
              >
                <div
                  className={
                    isSelected
                      ? "h-full w-full rounded-2xl border border-cyan-300/60 bg-black/10 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                      : "h-full w-full rounded-2xl border border-white/10 bg-black/10"
                  }
                  style={{
                    transform: "translateZ(0)",
                    opacity: el.fabricCustomization.opacity,
                  }}
                >
                  <div
                    className="h-full w-full rounded-2xl"
                    style={{
                      backgroundImage: `url(${svgUri})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      filter: `saturate(${1 + el.fabricCustomization.materialProperties.shine * 0.35})`,
                    }}
                  />
                </div>
              </div>
            );
          })}

        {selectedElement ? (
            <TransformHandles
              element={selectedElement}
              canvasRef={canvasRef}
              onTransform={(payload) => {
                if (payload.type === "MOVE") {
                  dispatch({ type: "MOVE", payload: { id: payload.id, transform: payload.transform } });
                }
                if (payload.type === "RESIZE") {
                  dispatch({
                    type: "RESIZE",
                    payload: { id: payload.id, width: payload.width, height: payload.height },
                  });
                }
                if (payload.type === "ROTATE") {
                  dispatch({
                    type: "ROTATE",
                    payload: { id: payload.id, rotationDeg: payload.rotationDeg },
                  });
                }
              }}
              onCommit={() => dispatch({ type: "COMMIT", payload: {} })}
              onRequestSelect={(id: string) => dispatch({ type: "SELECT", payload: { id } })}
            />
          ) : null}



        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 backdrop-blur">
          <p className="text-[11px] font-semibold text-zinc-300">
            Tip: Click canvas to deselect. Drag items in. Transform with handles.
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">No backend—rendering is template SVG placeholders.</p>
        </div>
      </div>
    </div>
  );
}

