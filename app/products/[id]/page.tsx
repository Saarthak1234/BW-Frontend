"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react"
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
    image: "/placeholder.svg?height=400&width=400",
    onSale: true,
    description:
      "Creamy and delicious Greek yogurt packed with fresh blueberries. Made with live active cultures and no artificial flavors. Rich in protein and probiotics, perfect for a healthy breakfast or snack. Our premium yogurt is made from the finest milk and real fruit pieces for an authentic taste experience. Each serving contains 15g of protein and billions of live probiotics to support digestive health. The blueberries are carefully selected for their sweetness and nutritional value, providing antioxidants and natural flavor. This yogurt is also an excellent source of calcium and vitamin D, making it a nutritious choice for the whole family.",
    shortDescription:
      "Creamy and delicious Greek yogurt packed with fresh blueberries. Made with live active cultures and no artificial flavors. Rich in protein and probiotics, perfect for a healthy breakfast or snack.",
  },
  {
    id: 2,
    name: "Britannia Cheese Slices",
    price: 24,
    originalPrice: null,
    rating: 5,
    image: "/placeholder.svg?height=400&width=400",
    onSale: false,
    description:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking. Made from fresh milk with no artificial preservatives. Each slice is individually wrapped to maintain freshness and flavor. Ideal for melting and provides a rich, creamy taste that enhances any dish. Our cheese is aged to perfection, developing a smooth texture and balanced flavor that appeals to all ages. Whether you're making a grilled cheese sandwich, adding to a burger, or using in recipes, these slices deliver consistent quality and taste. The convenient packaging makes it easy to use just what you need while keeping the rest fresh.",
    shortDescription:
      "Premium quality cheese slices perfect for sandwiches, burgers, and cooking. Made from fresh milk with no artificial preservatives.",
  },
  {
    id: 3,
    name: "Napolitanke Ljesnjak",
    price: 32,
    originalPrice: 35,
    rating: 4,
    image: "/placeholder.svg?height=400&width=400",
    onSale: true,
    description:
      "Delicious hazelnut wafer cookies with layers of crispy wafers and smooth hazelnut cream. A perfect treat for coffee time or as a sweet snack. Made with real hazelnuts and premium ingredients. Each bite delivers a satisfying crunch followed by rich, nutty flavor that melts in your mouth. These European-style wafers are crafted using traditional methods, ensuring authentic taste and texture. The hazelnut cream filling is made from carefully roasted hazelnuts, providing a rich and indulgent experience. Perfect for sharing with family and friends or enjoying as a personal treat with your favorite beverage.",
    shortDescription:
      "Delicious hazelnut wafer cookies with layers of crispy wafers and smooth hazelnut cream. A perfect treat for coffee time or as a sweet snack.",
  },
  {
    id: 4,
    name: "Golden Pineapple",
    price: 24,
    originalPrice: null,
    rating: 4,
    image: "/placeholder.svg?height=400&width=400",
    onSale: false,
    description:
      "Fresh, sweet golden pineapple bursting with tropical flavor. Hand-picked at peak ripeness to ensure maximum sweetness and juiciness. Rich in vitamin C, manganese, and digestive enzymes. Perfect for eating fresh, adding to smoothies, or using in cooking and baking for a tropical twist. Our pineapples are sourced from sustainable farms where they're allowed to ripen naturally on the plant, resulting in superior flavor and nutritional content. The golden variety is known for its exceptional sweetness and lower acidity, making it enjoyable for everyone. Each pineapple is carefully inspected to ensure it meets our high standards for quality and freshness.",
    shortDescription:
      "Fresh, sweet golden pineapple bursting with tropical flavor. Hand-picked at peak ripeness to ensure maximum sweetness and juiciness.",
  },
  {
    id: 5,
    name: "Beetroot",
    price: 13,
    originalPrice: 18,
    rating: 4,
    image: "/placeholder.svg?height=400&width=400",
    onSale: true,
    description:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color. Packed with essential nutrients, fiber, and antioxidants. Perfect for roasting, juicing, or adding to salads. These beetroots are grown without pesticides and harvested at peak freshness to deliver maximum nutritional value and taste. Rich in folate, potassium, and nitrates, beetroot supports cardiovascular health and athletic performance. The deep red color comes from betalains, powerful antioxidants that provide anti-inflammatory benefits. Whether you roast them for a sweet, caramelized flavor or juice them for a nutritious drink, these beetroots offer versatility and exceptional health benefits.",
    shortDescription:
      "Fresh, organic beetroot known for its earthy flavor and vibrant color. Packed with essential nutrients, fiber, and antioxidants.",
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className={`min-h-screen bg-amber-50 flex items-center justify-center p-4 ${zillaSlab.variable}`}>
        <div className="text-center max-w-md w-full">
          <h1 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 ${zillaSlab.className}`}>
            Product Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Product Detail Content */}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Product Image and Basic Info */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row bg-amber-50">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  <h1
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ${zillaSlab.className}`}
                  >
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg sm:text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center text-green-600 font-semibold">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    In Stock
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.shortDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h2
                className={`text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 ${zillaSlab.className}`}
              >
                Product Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
