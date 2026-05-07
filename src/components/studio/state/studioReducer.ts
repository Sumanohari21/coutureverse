import type {
  StudioElement,
  StudioState,
  StudioStateSnapshot,
  Transform,
} from "./types";

type MovePayload = {
  id: string;
  transform: Partial<Transform>;
};

type ResizePayload = {
  id: string;
  width: number;
  height: number;
};

type RotatePayload = {
  id: string;
  rotationDeg: number;
};

type LayerPayload = {
  id: string;
  direction: "front" | "back" | "forward" | "backward";
};

type SelectPayload = {
  id: string | null;
};

type AddPayload = {
  element: StudioElement;
};

type UndoPayload = unknown;

type RedoPayload = unknown;

type CommitPayload = unknown;


type Action =
  | { type: "ADD"; payload: AddPayload }
  | { type: "SELECT"; payload: SelectPayload }
  | { type: "MOVE"; payload: MovePayload }
  | { type: "RESIZE"; payload: ResizePayload }
  | { type: "ROTATE"; payload: RotatePayload }
  | { type: "LAYER"; payload: LayerPayload }
  | {
      type: "APPLY_MATERIAL";
      payload: { id: string; materialId: import("../materials/data/materialLibrary").FabricMaterialId };
    }
  | { type: "UNDO"; payload: UndoPayload }
  | { type: "REDO"; payload: RedoPayload }
  | { type: "COMMIT"; payload: CommitPayload };


function snapshot(state: StudioState): StudioStateSnapshot {
  return {
    elements: state.elements.map((e) => ({ ...e })),
    selectedId: state.selectedId,
  };
}

function cloneElements(elements: StudioElement[]): StudioElement[] {
  // Deep-ish clone of transform/customization to avoid history mutation.
  return elements.map((e) => ({
    ...e,
    transform: { ...e.transform },
    fabricCustomization: {
      ...e.fabricCustomization,
      color: { ...e.fabricCustomization.color },
      materialProperties: { ...e.fabricCustomization.materialProperties },
      layeringMetadata: { ...e.fabricCustomization.layeringMetadata },
    },
  }));
}

export function studioReducer(state: StudioState, action: Action): StudioState {
  const applyPresent = (elements: StudioElement[], selectedId: string | null) => ({
    ...state,
    elements,
    selectedId,
  });

  switch (action.type) {
    case "ADD": {
      const elements = [...state.elements, action.payload.element];
      return applyPresent(
        cloneElements(elements).sort((a, b) => a.zIndex - b.zIndex),
        action.payload.element.id
      );
    }

    case "SELECT": {
      return { ...state, selectedId: action.payload.id };
    }

    case "MOVE": {
      const elements = state.elements.map((e) => {
        if (e.id !== action.payload.id) return e;
        return {
          ...e,
          transform: {
            ...e.transform,
            ...action.payload.transform,
          },
        };
      });
      return applyPresent(cloneElements(elements), state.selectedId);
    }

    case "RESIZE": {
      const elements = state.elements.map((e) => {
        if (e.id !== action.payload.id) return e;
        return {
          ...e,
          transform: {
            ...e.transform,
            width: action.payload.width,
            height: action.payload.height,
          },
        };
      });
      return applyPresent(cloneElements(elements), state.selectedId);
    }

    case "ROTATE": {
      const elements = state.elements.map((e) => {
        if (e.id !== action.payload.id) return e;
        return {
          ...e,
          transform: {
            ...e.transform,
            rotationDeg: action.payload.rotationDeg,
          },
        };
      });
      return applyPresent(cloneElements(elements), state.selectedId);
    }

    case "LAYER": {
      const elements = state.elements.map((e) => ({ ...e }));
      const idx = elements.findIndex((e) => e.id === action.payload.id);
      if (idx === -1) return state;

      const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
      const currentIndex = sorted.findIndex((e) => e.id === action.payload.id);

      const maxZ = Math.max(...sorted.map((e) => e.zIndex), 0);
      const minZ = Math.min(...sorted.map((e) => e.zIndex), 0);

      const target = sorted[currentIndex];
      if (!target) return state;

      const swapWith = (otherId: string) => {
        const a = elements.find((e) => e.id === action.payload.id)!;
        const b = elements.find((e) => e.id === otherId)!;
        const za = a.zIndex;
        a.zIndex = b.zIndex;
        b.zIndex = za;
      };

      switch (action.payload.direction) {
        case "front": {
          elements.find((e) => e.id === target.id)!.zIndex = maxZ + 1;
          break;
        }
        case "back": {
          elements.find((e) => e.id === target.id)!.zIndex = minZ - 1;
          break;
        }
        case "forward": {
          const above = sorted[currentIndex + 1];
          if (above) swapWith(above.id);
          break;
        }
        case "backward": {
          const below = sorted[currentIndex - 1];
          if (below) swapWith(below.id);
          break;
        }
      }

      return applyPresent(
        cloneElements(elements).sort((a, b) => a.zIndex - b.zIndex),
        state.selectedId
      );
    }

    case "APPLY_MATERIAL": {
      const elements = cloneElements(state.elements);
      const idx = elements.findIndex((e) => e.id === action.payload.id);
      if (idx === -1) return state;

      // Pure reducer mapping: materials -> existing fabricCustomization fields
      // Static import would be preferable, but local import keeps reducer isolated.
      // Pure reducer mapping: materials -> existing fabricCustomization fields
      // Use a static import for a stable, lint-friendly reducer.
      // ESM import keeps lint happy.
      const { applyMaterialToCustomization } = await import(
        "../materials/data/materialLibrary"
      );









      elements[idx] = {
        ...elements[idx],
        fabricCustomization: applyMaterialToCustomization(
          elements[idx].fabricCustomization,
          action.payload.materialId
        ),
      };


      return applyPresent(elements.sort((a, b) => a.zIndex - b.zIndex), state.selectedId);
    }

    case "COMMIT": {

      // Push current present into past; clear future.
      const pastItem = snapshot(state);
      return {
        ...state,
        past: [...state.past, pastItem],
        future: [],
      };
    }

    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const past = state.past.slice(0, -1);
      const current = snapshot(state);
      return {
        ...state,
        past,
        future: [current, ...state.future],
        elements: cloneElements(previous.elements).sort((a, b) => a.zIndex - b.zIndex),
        selectedId: previous.selectedId,
      };
    }

    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const future = state.future.slice(1);
      const current = snapshot(state);
      return {
        ...state,
        past: [...state.past, current],
        future,
        elements: cloneElements(next.elements).sort((a, b) => a.zIndex - b.zIndex),
        selectedId: next.selectedId,
      };
    }

    default:
      return state;
  }
}

