"use client"

import Image from "next/image"
import Link from "next/link"
import { Zilla_Slab } from "next/font/google"

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
    name: "Blueberry Greek Yogurt",
    price: 18,
    originalPrice: 24,
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    onSale: true,
    description:
      "Creamy and delicious Greek yogurt packed with fresh blueberries. Made with live active cultures and no artificial flavors. Rich in protein and probiotics, perfect for a healthy breakfast or snack. Our premium yogurt is made from the finest milk and real fruit pieces for an authentic taste experience.",
    shortDescription: "Creamy Greek yogurt packed with fresh blueberries and live active cultures for a healthy snack.",
  },
  {
    id: 2,
    name: "Britannia Cheese Slices",
    price: 24,
    originalPrice: null,
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    onSale: false,
    description:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking. Made from fresh milk with no artificial preservatives. Each slice is individually wrapped to maintain freshness and flavor. Ideal for melting and provides a rich, creamy taste that enhances any dish.",
    shortDescription:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking with no artificial preservatives.",
  },
  {
    id: 3,
    name: "Napolitanke Ljesnjak",
    price: 32,
    originalPrice: 35,
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
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
    image: "/placeholder.svg?height=200&width=200",
    onSale: false,
    description:
      "Fresh, sweet golden pineapple bursting with tropical flavor. Hand-picked at peak ripeness to ensure maximum sweetness and juiciness. Rich in vitamin C, manganese, and digestive enzymes. Perfect for eating fresh, adding to smoothies, or using in cooking and baking for a tropical twist.",
    shortDescription: "Fresh, sweet golden pineapple bursting with tropical flavor, hand-picked at peak ripeness.",
  },
  {
    id: 5,
    name: "Beatroot",
    price: 13,
    originalPrice: 18,
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
    onSale: true,
    description:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color. Packed with essential nutrients, fiber, and antioxidants. Perfect for roasting, juicing, or adding to salads. These beetroots are grown without pesticides and harvested at peak freshness to deliver maximum nutritional value and taste.",
    shortDescription:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color, packed with essential nutrients.",
  },
]

export default function ProductsSection() {
  return (
    <div className={`min-h-screen bg-amber-50 py-12 sm:py-16 lg:py-24 ${zillaSlab.variable}`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-900 ${zillaSlab.className}`}>
          Our Premium Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:border-2 hover:border-amber-400 hover:scale-101 transition-all duration-300 border-2 border-transparent"
            >
              
              {/* Product Image */}
              <div className="relative h-96 sm:h-64 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className={`font-semibold text-gray-900 mb-2 text-sm ${zillaSlab.className}`}>
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-amber-600">${product.price}</span>
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-2 font-circe">{product.shortDescription}</p>
                </div>

                {/* View Description Button */}
                <Link href={`/products/${product.id}`} className="flex justify-center">
                  <button className="w-auto sm:w-1/2 bg-amber-500 text-white py-2 px-4 hover:bg-gray-800 transition-all duration-300 ease-in-out text-sm rounded-sm font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}