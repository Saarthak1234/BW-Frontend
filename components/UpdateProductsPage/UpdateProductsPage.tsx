"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Save, Trash2, Upload, Star } from "lucide-react"
import { Zilla_Slab } from "next/font/google"
import { useState } from "react"

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

interface ProductFormData {
  name: string
  price: number
  originalPrice: number | null
  rating: number
  image: string
  onSale: boolean
  description: string
  shortDescription: string
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || null,
    rating: product?.rating || 5,
    image: product?.image || "",
    onSale: product?.onSale || false,
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleUpdate = async () => {
    setIsUpdating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Updated product data:", formData)
    setUpdateSuccess(true)
    setIsUpdating(false)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setUpdateSuccess(false)
    }, 3000)
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Deleted product:", productId)
    setIsDeleting(false)
    setShowDeleteConfirm(false)

    // Redirect to products page
    router.push("/admin/products")
  }

  return (
    <div className={`min-h-screen bg-amber-50 ${zillaSlab.variable}`}>
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-amber-50/80 backdrop-blur-sm border-none p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-50 text-gray-600 hover:text-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex gap-3">
            {/* Update Success Message */}
            {updateSuccess && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                Product updated successfully!
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Product Edit Content */}
      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Product Image and Basic Info */}
          <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row bg-amber-50">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative bg-gray-100">
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt={formData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=400"
                    }}
                  />
                </div>

                {/* Image URL Input */}
                <div className="p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors pr-12"
                      placeholder="https://example.com/image.jpg"
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors ${zillaSlab.className}`}
                    />
                  </div>

                  {/* Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price ($)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice || ""}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full text-lg font-semibold text-gray-500 bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* On Sale Toggle */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="onSale"
                      checked={formData.onSale}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                    />
                    <label className="ml-2 text-sm font-semibold text-gray-700">Product is on sale</label>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center text-green-600 font-semibold">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    In Stock
                  </div>

                  {/* Short Description */}
                  <div className="border-t border-gray-100 pt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full text-gray-700 leading-relaxed text-sm sm:text-base bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/200 characters</p>
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
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg bg-transparent border-2 border-transparent hover:border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{formData.description.length}/1000 characters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className={`text-xl font-bold text-gray-900 mb-4 ${zillaSlab.className}`}>Delete Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{formData.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
