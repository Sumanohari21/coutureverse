"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { StudioElement } from "../state/types";

type TransformPayload =
  | {
      type: "MOVE";
      id: string;
      transform: { x: number; y: number };
    }
  | {
      type: "RESIZE";
      id: string;
      width: number;
      height: number;
    }
  | {
      type: "ROTATE";
      id: string;
      rotationDeg: number;
    };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function TransformHandles({
  element,
  canvasRef,
  onTransform,
  onCommit,
  onRequestSelect,
}: {
  element: StudioElement;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onTransform: (payload: TransformPayload) => void;
  onCommit: () => void;
  onRequestSelect: (id: string) => void;
}) {
  const [activeHandle, setActiveHandle] = useState<null | "nw" | "ne" | "sw" | "se">(null);
  const [activeRotate, setActiveRotate] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef<{
    pointer: { x: number; y: number };
    transform: StudioElement["transform"];
    center: { x: number; y: number };
  } | null>(null);

  const rect = useMemo(() => {
    return {
      left: element.transform.x,
      top: element.transform.y,
      width: element.transform.width,
      height: element.transform.height,
    };
  }, [element]);

  const canvasPoint = useCallback((clientX: number, clientY: number) => {
    const el = canvasRef.current;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }, [canvasRef]);

  const onPointerDownHandle = useCallback(
    (e: React.PointerEvent, handle: "nw" | "ne" | "sw" | "se") => {
      e.stopPropagation();
      onRequestSelect(element.id);
      pointerIdRef.current = e.pointerId;
      setActiveHandle(handle);
      const p = canvasPoint(e.clientX, e.clientY);
      startRef.current = {
        pointer: p,
        transform: { ...element.transform },
        center: {
          x: element.transform.x + element.transform.width / 2,
          y: element.transform.y + element.transform.height / 2,
        },
      };
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [canvasPoint, element, onRequestSelect]
  );

  const onPointerDownRotate = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      onRequestSelect(element.id);
      pointerIdRef.current = e.pointerId;
      setActiveRotate(true);
      const p = canvasPoint(e.clientX, e.clientY);
      startRef.current = {
        pointer: p,
        transform: { ...element.transform },
        center: {
          x: element.transform.x + element.transform.width / 2,
          y: element.transform.y + element.transform.height / 2,
        },
      };
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [canvasPoint, element, onRequestSelect]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!startRef.current) return;
      const p = canvasPoint(e.clientX, e.clientY);
      const s = startRef.current;

      if (activeRotate) {
        const dx = p.x - s.center.x;
        const dy = p.y - s.center.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        onTransform({ type: "ROTATE", id: element.id, rotationDeg: angle });
        return;
      }

      if (!activeHandle) return;

      const minSize = 60;
      const dx = p.x - s.pointer.x;
      const dy = p.y - s.pointer.y;

      let width = s.transform.width;
      let height = s.transform.height;
      let x = s.transform.x;
      let y = s.transform.y;

      // Note: simplistic resize without accounting for rotation.
      // Works for initial version; can be enhanced later.
      if (activeHandle.includes("e")) width = clamp(s.transform.width + dx, minSize, 2000);
      if (activeHandle.includes("s")) height = clamp(s.transform.height + dy, minSize, 2000);
      if (activeHandle.includes("w")) {
        width = clamp(s.transform.width - dx, minSize, 2000);
        x = s.transform.x + dx;
      }
      if (activeHandle.includes("n")) {
        height = clamp(s.transform.height - dy, minSize, 2000);
        y = s.transform.y + dy;
      }

      onTransform({ type: "RESIZE", id: element.id, width, height });
      // Move top-left when resizing from nw/ne/sw.
      onTransform({ type: "MOVE", id: element.id, transform: { x, y } });
    },
    [activeHandle, activeRotate, canvasPoint, element.id, onTransform]
  );

  const onPointerUp = useCallback(() => {
    if (!startRef.current) return;
    onCommit();
    startRef.current = null;
    setActiveHandle(null);
    setActiveRotate(false);
    pointerIdRef.current = null;
  }, [onCommit]);

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        transform: `rotate(${element.transform.rotationDeg}deg)`,
        transformOrigin: "top left",
        zIndex: element.zIndex + 10,
        pointerEvents: "none",
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Rotation handle */}
      <div
        className="pointer-events-auto absolute left-1/2 top-[-34px] h-9 w-9 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 backdrop-blur"
        onPointerDown={onPointerDownRotate}
        role="button"
        aria-label="Rotate"
        title="Rotate"
      >
        <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
      </div>

      {/* Resize handles */}
      {([
        "nw",
        "ne",
        "sw",
        "se",
      ] as const).map((h) => {
        const pos =
          h === "nw"
            ? { left: -6, top: -6 }
            : h === "ne"
              ? { right: -6, top: -6 }
              : h === "sw"
                ? { left: -6, bottom: -6 }
                : { right: -6, bottom: -6 };

        return (
          <div
            key={h}
            className="pointer-events-auto absolute h-12 w-12 rounded-full border border-cyan-300/40 bg-black/20"
            style={pos}
            onPointerDown={(e) => onPointerDownHandle(e, h)}
            role="button"
            aria-label={`Resize ${h}`}
            title="Resize"
          >
            <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.65)]" />
          </div>
        );
      })}
    </div>
  );
}

