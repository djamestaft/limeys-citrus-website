"use client"

import type { Equipment } from "./equipment-rental-system"
import { EquipmentCard } from "./equipment-card"

interface EquipmentGridProps {
  equipment: Equipment[]
  onAddToCart: (equipment: Equipment, quantity?: number, rentalDays?: number) => void
}

export function EquipmentGrid({ equipment, onAddToCart }: EquipmentGridProps) {
  if (equipment.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">No equipment found</p>
          <p className="text-sm">Try adjusting your search or category filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {equipment.map((item) => (
          <EquipmentCard key={item.id} equipment={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}
