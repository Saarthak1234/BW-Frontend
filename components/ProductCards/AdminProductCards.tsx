"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Zilla_Slab } from "next/font/google"
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";

// Configure the Google Font
const zillaSlab = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zilla-slab",
})

const products = [
  {
    id: 1,
    name: "Highland Greek Yogurt Blueberry",
    price: 18,
    originalPrice: 24,
    rating: 5,
    image: "/images/Highland-Greek-Yogurt-Blueberry.webp",
    onSale: true,
    description:
      "Creamy and delicious Greek yogurt packed with fresh blueberries. Made with live active cultures and no artificial flavors. Rich in protein and probiotics, perfect for a healthy breakfast or snack. Our premium yogurt is made from the finest milk and real fruit pieces for an authentic taste experience.",
    shortDescription:
      "Creamy Greek yogurt packed with fresh blueberries and live active cultures for a healthy snack.",
  },
  {
    id: 2,
    name: "Britannia Cheese Slices",
    price: 24,
    originalPrice: null,
    rating: 5,
    image: "/images/Britannia-Cheese-Slices.jpg",
    onSale: false,
    description:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking. Made from fresh milk with no artificial preservatives. Each slice is individually wrapped to maintain freshness and flavor. Ideal for melting and provides a rich, creamy taste that enhances any dish.",
    shortDescription:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking with no artificial preservatives.",
  },
  {
    id: 3,
    name: "Loacker Hazelnut Wafer Minis",
    price: 32,
    originalPrice: 35,
    rating: 4,
    image: "/images/Loacker-Hazelnut-Wafer-Minis.jpg",
    onSale: true,
    description:
      "Delicious hazelnut wafer cookies with layers of crispy wafers and smooth hazelnut cream. A perfect treat for coffee time or as a sweet snack. Made with real hazelnuts and premium ingredients. Each bite delivers a satisfying crunch followed by rich, nutty flavor that melts in your mouth.",
    shortDescription:
      "Delicious hazelnut wafer cookies with layers of crispy wafers and smooth hazelnut cream filling.",
  },
  {
    id: 4,
    name: "Golden Pineapple",
    price: 24,
    originalPrice: null,
    rating: 4,
    image: "/images/Golden-Pineapple.jpg",
    onSale: false,
    description:
      "Fresh, sweet golden pineapple bursting with tropical flavor. Hand-picked at peak ripeness to ensure maximum sweetness and juiciness. Rich in vitamin C, manganese, and digestive enzymes. Perfect for eating fresh, adding to smoothies, or using in cooking and baking for a tropical twist.",
    shortDescription:
      "Fresh, sweet golden pineapple bursting with tropical flavor, hand-picked at peak ripeness.",
  },
  {
    id: 5,
    name: "Beetroot",
    price: 13,
    originalPrice: 18,
    rating: 4,
    image: "/images/Beetroot.jpg",
    onSale: true,
    description:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color. Packed with essential nutrients, fiber, and antioxidants. Perfect for roasting, juicing, or adding to salads. These beetroots are grown without pesticides and harvested at peak freshness to deliver maximum nutritional value and taste.",
    shortDescription:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color, packed with essential nutrients.",
  },
  {
    id: 6,
    name: "Amul Butter",
    price: 40,
    originalPrice: 48,
    rating: 5,
    image: "/images/Amul-Butter.jpg",
    onSale: true,
    description:
      "Classic creamy Amul butter made from pure milk fat. Ideal for spreading on bread, baking, and cooking. Rich in flavor and a staple in Indian households for decades.",
    shortDescription:
      "Classic creamy Amul butter made from pure milk fat — perfect for baking, cooking, or spreading.",
  },
  {
    id: 7,
    name: "Mother Dairy Toned Milk",
    price: 26,
    originalPrice: 30,
    rating: 4,
    image: "/images/Mother-Dairy-Toned-Milk.jpg",
    onSale: true,
    description:
      "Toned milk from Mother Dairy with balanced nutrition. Rich in calcium and protein, ideal for daily consumption. Pasteurized and hygienically packed.",
    shortDescription:
      "Nutritious toned milk packed with calcium and protein from Mother Dairy.",
  },
  {
    id: 8,
    name: "Parle-G Biscuits",
    price: 10,
    originalPrice: null,
    rating: 4,
    image: "/images/Parle-G-Biscuits.jpg",
    onSale: false,
    description:
      "Iconic glucose biscuits from Parle with a nostalgic taste. Perfect as a tea-time snack for all age groups.",
    shortDescription:
      "Iconic and affordable glucose biscuits — a perfect companion with tea.",
  },
  {
    id: 9,
    name: "Fortune Chakki Fresh Atta",
    price: 55,
    originalPrice: 65,
    rating: 5,
    image: "/images/Fortune-Chakki-Atta.webp",
    onSale: true,
    description:
      "Whole wheat flour made from the choicest grains. Soft, fluffy rotis every time. High fiber content supports digestion and health.",
    shortDescription:
      "High-quality whole wheat flour for soft rotis and great nutritional value.",
  },
  {
    id: 10,
    name: "Kissan Mixed Fruit Jam",
    price: 75,
    originalPrice: 90,
    rating: 5,
    image: "/images/Kissan-Mixed-Fruit-Jam.jpg",
    onSale: true,
    description:
      "A tasty blend of multiple fruits in one jar. No breakfast is complete without this sweet spread on toast or paratha.",
    shortDescription:
      "Sweet and fruity jam with a blend of mixed fruits — perfect for breakfast.",
  }
]

function SortableItem({ product, zillaSlab }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-in-out",
    willChange: "transform",
    zIndex: transform ? 9999 : ("auto" as "auto" | number),
    position: transform ? "relative" : ("static" as "relative" | "static"),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:border-2 hover:border-amber-400 hover:scale-101 transition-all duration-300 border-2 border-transparent ${
        transform ? "scale-105 shadow-2xl ring-2 ring-amber-300" : ""
      }`}
    >
      <div className="absolute top-2 right-2 z-20 cursor-grab active:cursor-grabbing">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="relative h-64 bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>
      <div className="p-4">
        <h3 className={`font-semibold text-gray-900 mb-2 text-sm ${zillaSlab.className}`}>{product.name}</h3>
        <div className="mb-4">
          <span className="text-lg font-bold text-amber-600">${product.price}</span>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-2 font-circe">{product.shortDescription}</p>
        </div>
        <Link href={`/admin/products/${product.id}/edit`} className="flex justify-center">
          <button className="w-auto sm:w-1/2 bg-amber-500 text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 ease-in-out text-sm rounded-sm font-semibold">
            Update Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function AdminProductsSection() {
  const [items, setItems] = useState(products);

  useEffect(() => {
    setItems(products);
  }, []);

  return (
    <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-0 ${zillaSlab.className}`}
          >
            Manage Products
          </h1>
          <Link href="/admin/products/add">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </Link>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (active.id !== over?.id) {
              setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {items.map((product) => (
                <SortableItem key={product.id} product={product} zillaSlab={zillaSlab} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
