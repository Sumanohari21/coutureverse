import type {
  FabricCustomization,
  FabricType,
  LayeringMetadata,
  MaterialProperties,
} from "../../state/types";

// NOTE: We keep the existing FabricType union values and map materials internally.
// These IDs are UI-facing and stable.
export type FabricMaterialId =
  | "silk"
  | "velvet"
  | "leather"
  | "satin"
  | "denim"
  | "metallic"
  | "cotton"
  | "transparent"
  | "futuristic";

export type FabricMaterialPhysicsMetadata = {
  drape: number; // 0..1
  seamTension: number; // 0..1
  stretch: number; // 0..1
  receiveShadows: boolean;
};

export type FabricMaterial = {
  id: FabricMaterialId;
  name: string;

  // mapped internally to existing FabricType union
  fabricType: FabricType;

  textureId: string; // placeholder for future custom texture uploads
  texturePreview: (shineLevel: number) => string; // SVG data-uri

  shineLevel: number; // 0..1
  opacity: number; // 0..1

  materialProperties: Omit<MaterialProperties, "opacity" | "shine"> & {
    opacity?: never;
    shine?: never;
  };

  layeringMetadata: LayeringMetadata;

  // Future-ready: physics metadata, dye/color hooks, recommendations hooks
  physics: FabricMaterialPhysicsMetadata;
  dye: {
    hueFamily: string; // stable label for future dye system
  };
  ai: {
    tags: string[];
  };
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function makeTexturePreview({
  baseA,
  baseB,
  accent,
  motif,
}: {
  baseA: string;
  baseB: string;
  accent: string;
  motif: "weave" | "velvet" | "leather" | "denim" | "metal" | "sheer" | "grid";
}) {
  return (shineLevel: number) => {
    const s = clamp01(shineLevel);
    const hi = 0.15 + s * 0.75;
    const glow = 0.05 + s * 0.25;

    // The previews are schematic SVG patterns; real textures will be plug-in later.
    const common = `
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${baseA}"/>
          <stop offset="1" stop-color="${baseB}"/>
        </linearGradient>
        <radialGradient id="r" cx="30%" cy="20%" r="80%">
          <stop offset="0" stop-color="${accent}" stop-opacity="${hi}"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="120" height="120" rx="18" fill="url(#g)"/>
      <rect width="120" height="120" rx="18" fill="url(#r)"/>
      <rect width="120" height="120" rx="18" fill="rgba(255,255,255,0.04)"/>
    `;

    let motifSvg = "";
    switch (motif) {
      case "weave":
        motifSvg = `
          <g opacity="0.85" stroke="rgba(255,255,255,0.12)" stroke-width="2">
            ${Array.from({ length: 8 })
              .map((_, i) => {
                const y = 18 + i * 12;
                return `<path d="M0 ${y} C 30 ${y - 6}, 90 ${y + 6}, 120 ${y}"/>`;
              })
              .join("")}
          </g>
          <g opacity="0.65" stroke="rgba(0,0,0,0.18)" stroke-width="2">
            ${Array.from({ length: 8 })
              .map((_, i) => {
                const x = 10 + i * 14;
                return `<path d="M${x} 0 C ${x - 8} 30, ${x + 8} 80, ${x} 120"/>`;
              })
              .join("")}
          </g>
        `;
        break;

      case "velvet":
        motifSvg = `
          <g opacity="0.9" filter="url(#soft)">
            ${Array.from({ length: 14 })
              .map((_, i) => {
                const y = 10 + i * 8;
                const op = 0.04 + s * 0.08;
                return `<path d="M-10 ${y} C 30 ${y - 12}, 60 ${y + 12}, 130 ${y}" stroke="rgba(255,255,255,${op})" stroke-width="10" stroke-linecap="round"/>`;
              })
              .join("")}
          </g>
          <rect width="120" height="120" rx="18" fill="rgba(0,0,0,0.18)" opacity="${0.25 + (1 - s) * 0.4}"/>
        `;
        break;

      case "leather":
        motifSvg = `
          <g opacity="0.75">
            ${Array.from({ length: 20 })
              .map((_, i) => {
                const x = (i * 7) % 120;
                const y = 8 + ((i * 13) % 112);
                const op = 0.05 + s * 0.1;
                return `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="rgba(0,0,0,${op})"/>`;
              })
              .join("")}
          </g>
          <path d="M-10 90 C 30 70, 70 110, 130 70" stroke="rgba(255,255,255,0.15)" stroke-width="3" opacity="${0.15 + s * 0.55}" fill="none"/>
        `;
        break;

      case "denim":
        motifSvg = `
          <g opacity="0.9" stroke="rgba(255,255,255,0.18)" stroke-width="2">
            ${Array.from({ length: 10 })
              .map((_, i) => {
                const x = 10 + i * 11;
                return `<path d="M${x} 0 L${x + 18} 120"/>`;
              })
              .join("")}
          </g>
          <g opacity="0.6" stroke="rgba(0,0,0,0.25)" stroke-width="3">
            ${Array.from({ length: 9 })
              .map((_, i) => {
                const y = 10 + i * 12;
                return `<path d="M0 ${y} C 30 ${y - 8}, 80 ${y + 8}, 120 ${y}"/>`;
              })
              .join("")}
          </g>
          <path d="M0 100 C 25 80, 60 115, 120 85" stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none"/>
        `;
        break;

      case "metal":
        motifSvg = `
          <g>
            <rect width="120" height="120" rx="18" fill="rgba(255,255,255,0.03)"/>
            <path d="M-10 40 L 130 20" stroke="rgba(255,255,255,0.22)" stroke-width="4" opacity="${0.2 + s * 0.6}"/>
            <path d="M-10 70 L 130 50" stroke="rgba(0,0,0,0.25)" stroke-width="4" opacity="${0.12 + (1 - s) * 0.5}"/>
            <g opacity="0.85">
              ${Array.from({ length: 16 })
                .map((_, i) => {
                  const y = 12 + i * 6;
                  return `<rect x="0" y="${y}" width="120" height="2" fill="rgba(255,255,255,${0.03 + s * 0.08})"/>`;
                })
                .join("")}
            </g>
          </g>
        `;
        break;

      case "sheer":
        motifSvg = `
          <g opacity="0.9">
            ${Array.from({ length: 9 })
              .map((_, i) => {
                const x = 8 + i * 12;
                return `<rect x="${x}" y="-10" width="6" height="140" fill="rgba(255,255,255,${0.04 + s * 0.06})" transform="rotate(${(i - 4) * 5} 60 60)"/>`;
              })
              .join("")}
          </g>
          <rect width="120" height="120" rx="18" fill="rgba(255,255,255,0.03)"/>
        `;
        break;

      case "grid":
        motifSvg = `
          <g opacity="0.85" stroke="rgba(255,255,255,0.18)" stroke-width="2">
            ${Array.from({ length: 7 })
              .map((_, i) => {
                const x = 10 + i * 16;
                return `<path d="M${x} 0 V 120"/>`;
              })
              .join("")}
            ${Array.from({ length: 7 })
              .map((_, i) => {
                const y = 10 + i * 16;
                return `<path d="M0 ${y} H 120"/>`;
              })
              .join("")}
          </g>
          <circle cx="30" cy="32" r="12" fill="rgba(34,211,238,${glow})"/>
          <circle cx="88" cy="74" r="18" fill="rgba(236,72,153,${glow * 0.9})"/>
        `;
        break;
    }

    const shineOverlay = `
      <path d="M-20 20 C 30 0, 70 20, 140 5" stroke="rgba(255,255,255,${0.10 + s * 0.25})" stroke-width="6" fill="none"/>
      <path d="M-20 90 C 40 60, 80 95, 140 70" stroke="rgba(255,255,255,${0.08 + s * 0.2})" stroke-width="4" fill="none"/>
    `;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        ${common}
        ${motifSvg}
        ${shineOverlay}
        <rect x="4" y="4" width="112" height="112" rx="16" fill="none" stroke="rgba(255,255,255,0.10)"/>
      </svg>
    `;

    return svgDataUri(svg);
  };
}

export const materials: FabricMaterial[] = [
  {
    id: "silk",
    name: "Silk",
    fabricType: "shadow-satin",
    textureId: "tex_silk_weave",
    texturePreview: makeTexturePreview({
      baseA: "rgba(34,211,238,0.35)",
      baseB: "rgba(236,72,153,0.20)",
      accent: "rgba(255,255,255,1)",
      motif: "weave",
    }),
    shineLevel: 0.78,
    opacity: 0.98,
    materialProperties: {
      drape: 0.85,
      seamTension: 0.55,
      stretch: 0.3,
      sheen: 0.8,
    },
    layeringMetadata: {
      blendMode: "overlay",
      receiveShadows: true,
    },
    physics: {
      drape: 0.85,
      seamTension: 0.55,
      stretch: 0.3,
      receiveShadows: true,
    },
    dye: { hueFamily: "cool-magenta" },
    ai: { tags: ["luxury", "smooth", "flowy"] },
  },
  {
    id: "velvet",
    name: "Velvet",
    fabricType: "velvet-ember",
    textureId: "tex_velvet_pile",
    texturePreview: makeTexturePreview({
      baseA: "rgba(236,72,153,0.35)",
      baseB: "rgba(34,211,238,0.18)",
      accent: "rgba(255,255,255,1)",
      motif: "velvet",
    }),
    shineLevel: 0.52,
    opacity: 0.97,
    materialProperties: {
      drape: 0.62,
      seamTension: 0.72,
      stretch: 0.22,
      sheen: 0.46,
    },
    layeringMetadata: {
      blendMode: "multiply",
      receiveShadows: true,
    },
    physics: {
      drape: 0.62,
      seamTension: 0.72,
      stretch: 0.22,
      receiveShadows: true,
    },
    dye: { hueFamily: "ember-pink" },
    ai: { tags: ["soft", "pile", "dramatic"] },
  },
  {
    id: "leather",
    name: "Leather",
    fabricType: "neon-twill",
    textureId: "tex_leather_grain",
    texturePreview: makeTexturePreview({
      baseA: "rgba(250,204,21,0.20)",
      baseB: "rgba(236,72,153,0.16)",
      accent: "rgba(255,255,255,1)",
      motif: "leather",
    }),
    shineLevel: 0.61,
    opacity: 0.99,
    materialProperties: {
      drape: 0.38,
      seamTension: 0.86,
      stretch: 0.12,
      sheen: 0.58,
    },
    layeringMetadata: {
      blendMode: "overlay",
      receiveShadows: true,
    },
    physics: {
      drape: 0.38,
      seamTension: 0.86,
      stretch: 0.12,
      receiveShadows: true,
    },
    dye: { hueFamily: "gold-rose" },
    ai: { tags: ["structured", "grain", "edgy"] },
  },
  {
    id: "satin",
    name: "Satin",
    fabricType: "shadow-satin",
    textureId: "tex_satin_sheen",
    texturePreview: makeTexturePreview({
      baseA: "rgba(34,211,238,0.25)",
      baseB: "rgba(250,204,21,0.16)",
      accent: "rgba(255,255,255,1)",
      motif: "grid",
    }),
    shineLevel: 0.9,
    opacity: 0.98,
    materialProperties: {
      drape: 0.78,
      seamTension: 0.5,
      stretch: 0.28,
      sheen: 0.95,
    },
    layeringMetadata: {
      blendMode: "screen",
      receiveShadows: true,
    },
    physics: {
      drape: 0.78,
      seamTension: 0.5,
      stretch: 0.28,
      receiveShadows: true,
    },
    dye: { hueFamily: "cyan-gold" },
    ai: { tags: ["sleek", "glossy", "even"] },
  },
  {
    id: "denim",
    name: "Denim",
    fabricType: "neon-twill",
    textureId: "tex_denim_twill",
    texturePreview: makeTexturePreview({
      baseA: "rgba(34,211,238,0.25)",
      baseB: "rgba(59,130,246,0.14)",
      accent: "rgba(255,255,255,1)",
      motif: "denim",
    }),
    shineLevel: 0.35,
    opacity: 0.99,
    materialProperties: {
      drape: 0.45,
      seamTension: 0.8,
      stretch: 0.14,
      sheen: 0.25,
    },
    layeringMetadata: {
      blendMode: "multiply",
      receiveShadows: true,
    },
    physics: {
      drape: 0.45,
      seamTension: 0.8,
      stretch: 0.14,
      receiveShadows: true,
    },
    dye: { hueFamily: "indigo" },
    ai: { tags: ["tough", "twill", "everyday"] },
  },
  {
    id: "metallic",
    name: "Metallic",
    fabricType: "aurora-brocade",
    textureId: "tex_metallic_film",
    texturePreview: makeTexturePreview({
      baseA: "rgba(255,255,255,0.28)",
      baseB: "rgba(34,211,238,0.12)",
      accent: "rgba(255,255,255,1)",
      motif: "metal",
    }),
    shineLevel: 0.98,
    opacity: 0.95,
    materialProperties: {
      drape: 0.34,
      seamTension: 0.62,
      stretch: 0.18,
      sheen: 1,
    },
    layeringMetadata: {
      blendMode: "overlay",
      receiveShadows: true,
    },
    physics: {
      drape: 0.34,
      seamTension: 0.62,
      stretch: 0.18,
      receiveShadows: true,
    },
    dye: { hueFamily: "aurora-silver" },
    ai: { tags: ["reflective", "film", "statement"] },
  },
  // Extra materials already in the type union (future-ready)
  {
    id: "cotton",
    name: "Cotton",
    fabricType: "editorial-veil",
    textureId: "tex_cotton_soft",
    texturePreview: makeTexturePreview({
      baseA: "rgba(250,204,21,0.18)",
      baseB: "rgba(34,211,238,0.14)",
      accent: "rgba(255,255,255,1)",
      motif: "weave",
    }),
    shineLevel: 0.12,
    opacity: 0.99,
    materialProperties: {
      drape: 0.52,
      seamTension: 0.46,
      stretch: 0.26,
      sheen: 0.12,
    },
    layeringMetadata: {
      blendMode: "normal",
      receiveShadows: true,
    },
    physics: {
      drape: 0.52,
      seamTension: 0.46,
      stretch: 0.26,
      receiveShadows: true,
    },
    dye: { hueFamily: "natural-neutral" },
    ai: { tags: ["breathable", "matte", "comfort"] },
  },
  {
    id: "transparent",
    name: "Sheer",
    fabricType: "editorial-veil",
    textureId: "tex_sheer",
    texturePreview: makeTexturePreview({
      baseA: "rgba(255,255,255,0.18)",
      baseB: "rgba(34,211,238,0.12)",
      accent: "rgba(255,255,255,1)",
      motif: "sheer",
    }),
    shineLevel: 0.22,
    opacity: 0.72,
    materialProperties: {
      drape: 0.66,
      seamTension: 0.34,
      stretch: 0.22,
      sheen: 0.2,
    },
    layeringMetadata: {
      blendMode: "screen",
      receiveShadows: false,
    },
    physics: {
      drape: 0.66,
      seamTension: 0.34,
      stretch: 0.22,
      receiveShadows: false,
    },
    dye: { hueFamily: "mist" },
    ai: { tags: ["light", "airy", "veil"] },
  },
  {
    id: "futuristic",
    name: "Futuristic",
    fabricType: "aurora-brocade",
    textureId: "tex_futuristic_grid",
    texturePreview: makeTexturePreview({
      baseA: "rgba(34,211,238,0.22)",
      baseB: "rgba(236,72,153,0.14)",
      accent: "rgba(255,255,255,1)",
      motif: "grid",
    }),
    shineLevel: 0.7,
    opacity: 0.94,
    materialProperties: {
      drape: 0.4,
      seamTension: 0.6,
      stretch: 0.16,
      sheen: 0.72,
    },
    layeringMetadata: {
      blendMode: "overlay",
      receiveShadows: true,
    },
    physics: {
      drape: 0.4,
      seamTension: 0.6,
      stretch: 0.16,
      receiveShadows: true,
    },
    dye: { hueFamily: "neon" },
    ai: { tags: ["tech", "grid", "bold"] },
  },
];

export function getMaterialById(id: FabricMaterialId) {
  return materials.find((m) => m.id === id) ?? null;
}

export function getDefaultMaterialIdForFabricType(
  fabricType: FabricType
): FabricMaterialId | null {
  return materials.find((m) => m.fabricType === fabricType)?.id ?? null;
}

/**
 * Map a UI material selection to the fields we currently store on elements.

 *
 * Future-ready: later we can expand this function to include texture uploads,
 * color/dye systems, and physically based parameters.
 */
export function applyMaterialToCustomization(
  existing: FabricCustomization,
  materialId: FabricMaterialId
): FabricCustomization {
  const material = getMaterialById(materialId);
  if (!material) return existing;

  return {
    ...existing,
    fabricType: material.fabricType,
    texture: material.textureId,

    // Keep color/gradient as-is for future color system layering.
    // Update the material physics knobs.
    materialProperties: {
      ...existing.materialProperties,
      ...material.materialProperties,
    },
    opacity: material.opacity,
    shine: material.shineLevel,

    layeringMetadata: {
      ...existing.layeringMetadata,
      ...material.layeringMetadata,
    },
  };
}

