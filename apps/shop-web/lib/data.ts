export interface Product {
  id: string;
  name: string;
  line: string;
  price: number;
  image: string;
  imageHover: string;
  tag?: string;
  swatches: ("black" | "white" | "bone")[];
}

export const products: Product[] = [
  {
    id: "discobole",
    name: "Discobole Tee",
    line: "L'Olympionique",
    price: 55,
    image: "/assets/statue-back.jpg",
    imageHover: "/assets/statue-front.jpg",
    tag: "New",
    swatches: ["white", "bone"],
  },
  {
    id: "olympionique",
    name: "Olympionique Tee",
    line: "L'Olympionique",
    price: 49,
    image: "/assets/type-back.jpg",
    imageHover: "/assets/type-front.jpg",
    swatches: ["white"],
  },
  {
    id: "sports-club",
    name: "Sports Club Tee",
    line: "Sports Club",
    price: 45,
    image: "/assets/voyage-color.jpg",
    imageHover: "/assets/voyage-bw.jpg",
    tag: "Bestseller",
    swatches: ["black"],
  },
];
