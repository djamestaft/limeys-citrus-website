"use client"

import { useState } from "react"
import { CategorySidebar } from "./category-sidebar"
import { EquipmentGrid } from "./equipment-grid"
import { RentalCart } from "./rental-cart"
import { SearchHeader, type FilterOptions } from "./search-header"

export interface Equipment {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  dailyRate: number
  weeklyRate: number
  image: string
  availability: "available" | "rented" | "maintenance"
  specifications: Record<string, string>
}

export interface CartItem extends Equipment {
  quantity: number
  rentalDays: number
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "ARRI Alexa Mini LF",
    category: "Cameras",
    subcategory: "Digital Cinema Cameras",
    description: "Large format digital cinema camera with 4.5K recording",
    dailyRate: 850,
    weeklyRate: 4250,
    image: "/arri-alexa-mini-lf-professional-cinema-camera.jpg",
    availability: "available",
    specifications: {
      Sensor: "Large Format CMOS",
      Recording: "4.5K ProRes",
      Mount: "LPL",
      Weight: "2.3 kg",
    },
  },
  {
    id: "2",
    name: "RED V-Raptor 8K",
    category: "Cameras",
    subcategory: "Digital Cinema Cameras",
    description: "8K full-frame cinema camera with global shutter",
    dailyRate: 950,
    weeklyRate: 4750,
    image: "/red-v-raptor-8k-cinema-camera.jpg",
    availability: "available",
    specifications: {
      Sensor: "8K Full Frame",
      Recording: "8K R3D",
      Mount: "RF",
      Weight: "1.9 kg",
    },
  },
  {
    id: "3",
    name: "ARRI SkyPanel S60-C",
    category: "Lighting",
    subcategory: "LED Panels",
    description: "Color-tunable LED softlight panel",
    dailyRate: 125,
    weeklyRate: 625,
    image: "/arri-skypanel-s60-c-led-lighting-panel.jpg",
    availability: "available",
    specifications: {
      Power: "200W",
      "Color Temperature": "2800K-10000K",
      CRI: ">95",
      "Beam Angle": "115°",
    },
  },
  {
    id: "4",
    name: "Sound Devices 833",
    category: "Audio",
    subcategory: "Field Mixers",
    description: "8-input/12-track portable mixer and recorder",
    dailyRate: 185,
    weeklyRate: 925,
    image: "/sound-devices-833-professional-audio-mixer.jpg",
    availability: "rented",
    specifications: {
      Inputs: "8 Mic/Line",
      Tracks: "12 Track Recording",
      Format: "BWF/MP3",
      Power: "NP-1 Batteries",
    },
  },
  {
    id: "5",
    name: "Canon EOS R5 C",
    category: "Cameras",
    subcategory: "DSLR/Mirrorless",
    description: "Hybrid cinema camera with 8K internal recording",
    dailyRate: 275,
    weeklyRate: 1375,
    image: "/placeholder.svg?height=300&width=400&text=Canon+R5C",
    availability: "available",
    specifications: {
      Sensor: "Full Frame CMOS",
      Recording: "8K RAW Internal",
      Mount: "RF",
      Weight: "770g",
    },
  },
  {
    id: "6",
    name: "ARRI M18 HMI",
    category: "Lighting",
    subcategory: "HMI Lights",
    description: "1800W HMI daylight balanced light",
    dailyRate: 95,
    weeklyRate: 475,
    image: "/placeholder.svg?height=300&width=400&text=ARRI+M18",
    availability: "maintenance",
    specifications: {
      Power: "1800W",
      "Color Temperature": "5600K",
      BeamAngle: "Variable",
      Weight: "8.5 kg",
    },
  },
]

export function EquipmentRentalSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    availability: [],
    priceRange: [0, 2000],
    sortBy: "name",
  })

  const categories = ["All", "Cameras", "Lighting", "Audio", "Grip"]

  const filteredEquipment = mockEquipment
    .filter((item) => {
      // Category filtering
      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory ||
        item.subcategory === selectedCategory ||
        item.name.toLowerCase().includes(selectedCategory.toLowerCase())

      // Search filtering
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(item.specifications).some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

      // Availability filtering
      const matchesAvailability = filters.availability.length === 0 || filters.availability.includes(item.availability)

      // Price range filtering
      const matchesPrice = item.dailyRate >= filters.priceRange[0] && item.dailyRate <= filters.priceRange[1]

      return matchesCategory && matchesSearch && matchesAvailability && matchesPrice
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.dailyRate - b.dailyRate
        case "price-high":
          return b.dailyRate - a.dailyRate
        case "category":
          return a.category.localeCompare(b.category)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const addToCart = (equipment: Equipment, quantity = 1, rentalDays = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === equipment.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === equipment.id ? { ...item, quantity: item.quantity + quantity, rentalDays } : item,
        )
      }
      return [...prev, { ...equipment, quantity, rentalDays }]
    })
  }

  const removeFromCart = (equipmentId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== equipmentId))
  }

  const updateCartItem = (equipmentId: string, quantity: number, rentalDays: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === equipmentId ? { ...item, quantity, rentalDays } : item)))
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="flex-1 flex flex-col">
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartToggle={() => setIsCartOpen(!isCartOpen)}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="flex-1 overflow-auto">
          <EquipmentGrid equipment={filteredEquipment} onAddToCart={addToCart} />
        </div>
      </div>

      <RentalCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateItem={updateCartItem}
      />
    </div>
  )
}
