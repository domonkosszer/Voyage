export interface Product {
  id: string;
  name: string;
  category: "Men" | "Women" | "Performance" | "Lifestyle";
  price: number;
  image: string;
  imageHover: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Apex Performance Tee",
    category: "Performance",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=1200&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "p2",
    name: "Momentum Leggings",
    category: "Women",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Forge Track Jacket",
    category: "Men",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Stride Runner Shorts",
    category: "Performance",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "p5",
    name: "Off-Duty Hoodie",
    category: "Lifestyle",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Core Sports Bra",
    category: "Women",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    imageHover:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop",
  },
];

export interface CategoryItem {
  id: string;
  label: string;
  image: string;
}

export const categories: CategoryItem[] = [
  {
    id: "men",
    label: "Men",
    image:
      "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "women",
    label: "Women",
    image:
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "performance",
    label: "Performance",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Jonas Weber",
    role: "Marathonläufer",
    quote:
      "Das Material hält, was es verspricht. Nach 30 km Training merkt man jede Naht – hier merkt man keine.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Lea Brunner",
    role: "Personal Trainerin",
    quote:
      "Endlich Sportwear, die im Studio genauso funktioniert wie danach beim Kaffee mit Freunden.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Marco Steiner",
    role: "CrossFit Athlet",
    quote:
      "Passform und Verarbeitung auf einem Niveau, das ich sonst nur von den großen Marken kenne.",
    rating: 4,
  },
];
