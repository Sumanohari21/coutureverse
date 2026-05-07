export type FeaturedLook = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  accent: "cyan" | "fuchsia" | "gold";
  imageSrc?: string;
};

export const featuredLooks: FeaturedLook[] = [
  {
    id: "noir-atelier",
    name: "Noir Atelier",
    tagline: "Shadow-satin tailoring with AI precision.",
    category: "Noir Couture",
    accent: "fuchsia",
  },
  {
    id: "runway-bloom",
    name: "Runway Bloom",
    tagline: "Iridescent florals, engineered for movement.",
    category: "Floral Motion",
    accent: "cyan",
  },
  {
    id: "aether-corsage",
    name: "Aether Corsage",
    tagline: "A metallic whisper of structure and light.",
    category: "Avant Drapé",
    accent: "gold",
  },
  {
    id: "chromatic-veil",
    name: "Chromatic Veil",
    tagline: "Gradient couture designed for the camera.",
    category: "Editorial Ready",
    accent: "cyan",
  },
  {
    id: "velvet-ember",
    name: "Velvet Ember",
    tagline: "Warm depth with a modern silhouette.",
    category: "Nightfall",
    accent: "fuchsia",
  },
  {
    id: "aurora-baselayer",
    name: "Aurora Baselayer",
    tagline: "Smart layers that adapt to every scene.",
    category: "Tech Luxe",
    accent: "gold",
  },
];

export const navLinks: Array<{ label: string; href: string }> = [
  { label: "Showcase", href: "#showcase" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

