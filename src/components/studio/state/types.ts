export type Category =
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Sleeves"
  | "Shoes"
  | "Accessories";

export type FabricType =
  | "shadow-satin"
  | "neon-twill"
  | "velvet-ember"
  | "aurora-brocade"
  | "editorial-veil";

export type DesignColor = {
  primary: string;
  accent: string;
  gradient: string;
};

export type MaterialProperties = {
  drape: number; // 0..1
  seamTension: number; // 0..1
  stretch: number; // 0..1
  sheen: number; // 0..1
  opacity: number; // 0..1
  shine: number; // 0..1
};

export type LayeringMetadata = {
  blendMode: "normal" | "multiply" | "screen" | "overlay";
  receiveShadows: boolean;
};

// Future-ready: keep these fields even if UI isn’t implemented yet.
export type FabricCustomization = {
  fabricType: FabricType;
  texture: string; // pattern id placeholder
  color: DesignColor;
  gradient: string; // css-like placeholder
  materialProperties: MaterialProperties;
  opacity: number;
  shine: number;
  layeringMetadata: LayeringMetadata;
};

export type Transform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotationDeg: number;
};

export type StudioElement = {
  id: string;
  category: Category;
  templateId: string;
  name: string;
  transform: Transform;
  zIndex: number;
  isLocked?: boolean;

  // --- Fabric/Color (future-ready) ---
  fabricCustomization: FabricCustomization;
};

export type StudioState = {
  elements: StudioElement[];
  selectedId: string | null;
  // For internal history
  past: StudioStateSnapshot[];
  future: StudioStateSnapshot[];
};

export type StudioStateSnapshot = {
  elements: StudioElement[];
  selectedId: string | null;
};

