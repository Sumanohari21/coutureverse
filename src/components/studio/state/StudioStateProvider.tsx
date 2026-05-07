"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import type { StudioElement, StudioState } from "./types";
import { studioReducer } from "./studioReducer";

type StudioDispatch = (action: { type: string; payload?: unknown }) => void;


const StudioStateContext = createContext<StudioState | null>(null);
const StudioDispatchContext = createContext<StudioDispatch | null>(null);

export function StudioStateProvider({
  children,
  initialElements,
}: {
  children: React.ReactNode;
  initialElements: StudioElement[];
}) {
  const initialState: StudioState = useMemo(
    () => ({
      elements: initialElements,
      selectedId: null,
      past: [],
      future: [],
    }),
    [initialElements]
  );

  const [state, dispatch] = useReducer(studioReducer, initialState);

  const undo = useCallback(() => dispatch({ type: "UNDO", payload: {} }), []);
  const redo = useCallback(() => dispatch({ type: "REDO", payload: {} }), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;

      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.key.toLowerCase() === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [redo, undo]);

  return (
    <StudioStateContext.Provider value={state}>
      <StudioDispatchContext.Provider value={dispatch}>
        {children}
      </StudioDispatchContext.Provider>
    </StudioStateContext.Provider>
  );

}

export function useStudioState() {
  const ctx = useContext(StudioStateContext);
  if (!ctx) throw new Error("useStudioState must be used within StudioStateProvider");
  return ctx;
}

export function useStudioDispatch() {
  const ctx = useContext(StudioDispatchContext);
  if (!ctx) throw new Error("useStudioDispatch must be used within StudioStateProvider");
  return ctx;
}

