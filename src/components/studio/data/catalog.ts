import type { Category, StudioElement } from "../state/types";

export type TemplateId =
  | "top-tee"
  | "top-blouse"
  | "bottom-jeans"
  | "bottom-skirt"
  | "dress-midi"
  | "dress-maxi"
  | "sleeve-plain"
  | "sleeve-bell"
  | "shoe-derby"
  | "shoe-heel"
  | "accessory-bag"
  | "accessory-jewelry";

export const categoryOrder: Category[] = [
  "Tops",
  "Bottoms",
  "Dresses",
  "Sleeves",
  "Shoes",
  "Accessories",
];

export type Template = {
  id: TemplateId;
  category: Category;
  name: string;
  // SVG preview (frontend-only). Real fabric rendering can replace this later.
  svg: (fill: string) => string;
  defaultTransform: {
    width: number;
    height: number;
  };
};



export const templates: Template[] = [
  {
    id: "top-tee",
    category: "Tops",
    name: "Tee",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 30 L100 50 L130 30 L160 70 L120 70 L120 180 L80 180 L80 70 L40 70 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 220, height: 260 },
  },
  {
    id: "top-blouse",
    category: "Tops",
    name: "Blouse",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 25 C70 45 85 55 100 55 C115 55 130 45 135 25 L165 65 L145 85 L145 180 L55 180 L55 85 L35 65 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 230, height: 290 },
  },
  {
    id: "bottom-jeans",
    category: "Bottoms",
    name: "Jeans",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 20 L130 20 L150 180 L50 180 Z" fill="${fill}"/>
        <path d="M100 20 L100 180" stroke="rgba(0,0,0,0.35)" stroke-width="6"/>
      </svg>`,
    defaultTransform: { width: 240, height: 300 },
  },
  {
    id: "bottom-skirt",
    category: "Bottoms",
    name: "Skirt",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 55 C80 35 120 35 150 55 L140 180 L60 180 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 240, height: 260 },
  },
  {
    id: "dress-midi",
    category: "Dresses",
    name: "Midi Dress",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 25 C90 35 110 35 120 25 L150 55 L125 100 L140 180 L60 180 L75 100 L50 55 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 250, height: 320 },
  },
  {
    id: "dress-maxi",
    category: "Dresses",
    name: "Maxi Dress",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 18 C97 28 103 28 110 18 L160 60 L130 110 L150 190 L50 190 L70 110 L40 60 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 270, height: 360 },
  },
  {
    id: "sleeve-plain",
    category: "Sleeves",
    name: "Plain Sleeve",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 60 C80 40 120 40 135 60 C165 95 150 160 120 180 C110 170 90 170 80 180 C50 160 35 95 65 60 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 190, height: 240 },
  },
  {
    id: "sleeve-bell",
    category: "Sleeves",
    name: "Bell Sleeve",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 60 C85 40 115 40 135 60 C155 85 150 130 135 160 C120 175 110 185 100 185 C90 185 80 175 65 160 C50 130 45 85 65 60 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 200, height: 250 },
  },
  {
    id: "shoe-derby",
    category: "Shoes",
    name: "Derby",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 125 C55 110 75 95 100 95 C125 95 150 110 160 125 L155 170 L45 170 Z" fill="${fill}"/>
      </svg>`,
    defaultTransform: { width: 240, height: 170 },
  },
  {
    id: "shoe-heel",
    category: "Shoes",
    name: "Heel",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 120 C80 90 115 90 135 120 C150 145 150 160 140 170 L50 170 C45 160 45 145 60 120 Z" fill="${fill}"/>
        <path d="M140 170 L170 155 L172 170 Z" fill="rgba(255,255,255,0.12)"/>
      </svg>`,
    defaultTransform: { width: 240, height: 190 },
  },
  {
    id: "accessory-bag",
    category: "Accessories",
    name: "Bag",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 70 L135 70 L145 170 L55 170 Z" fill="${fill}"/>
        <path d="M80 70 C80 45 120 45 120 70" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="10" stroke-linecap="round"/>
      </svg>`,
    defaultTransform: { width: 180, height: 220 },
  },
  {
    id: "accessory-jewelry",
    category: "Accessories",
    name: "Jewelry",
    svg: (fill) =>
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 40 C85 55 115 55 130 40 C145 55 155 75 150 95 C145 115 120 125 100 125 C80 125 55 115 50 95 C45 75 55 55 70 40 Z" fill="${fill}"/>
        <circle cx="100" cy="150" r="20" fill="rgba(255,255,255,0.10)"/>
      </svg>`,
    defaultTransform: { width: 210, height: 230 },
  },
];

export function getTemplatesByCategory(category: Category) {
  return templates.filter((t) => t.category === category);
}

export function createElementFromTemplate({
  templateId,
  id,
  x,
  y,
}: {
  templateId: TemplateId;
  id: string;
  x: number;
  y: number;
}): StudioElement {
  const template = templates.find((t) => t.id === templateId);
  if (!template) {
    throw new Error(`Unknown templateId: ${templateId}`);
  }

  const primary = "rgba(34,211,238,0.55)";
  const accent = "rgba(236,72,153,0.45)";

  return {
    id,
    category: template.category,
    templateId,
    name: template.name,
    transform: {
      x,
      y,
      width: template.defaultTransform.width,
      height: template.defaultTransform.height,
      rotationDeg: 0,
    },
    zIndex: 1,
    fabricCustomization: {
      fabricType: "shadow-satin",
      texture: "placeholder-pattern",
      color: {
        primary,
        accent,
        gradient: "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(236,72,153,0.35))",
      },
      gradient: "placeholder-gradient",
      materialProperties: {
        drape: 0.7,
        seamTension: 0.6,
        stretch: 0.35,
        sheen: 0.8,
        opacity: 1,
        shine: 0.7,
      },
      opacity: 1,
      shine: 0.7,
      layeringMetadata: {
        blendMode: "normal",
        receiveShadows: true,
      },
    },
  };
}

