"use client"

import { useState } from "react"
import Image from "next/image"
import type { Equipment } from "./equipment-rental-system"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, DollarSign, Info, Plus, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface EquipmentCardProps {
  equipment: Equipment
  onAddToCart: (equipment: Equipment, quantity?: number, rentalDays?: number) => void
}

export function EquipmentCard({ equipment, onAddToCart }: EquipmentCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rented":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available"
      case "rented":
        return "Rented"
      case "maintenance":
        return "Maintenance"
      default:
        return "Unknown"
    }
  }

  const calculateTotal = () => {
    const rate = rentalDays >= 7 ? equipment.weeklyRate : equipment.dailyRate
    const multiplier = rentalDays >= 7 ? Math.ceil(rentalDays / 7) : rentalDays
    return rate * multiplier * quantity
  }

  const handleAddToCart = () => {
    onAddToCart(equipment, quantity, rentalDays)
    setQuantity(1)
    setRentalDays(1)
  }

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={equipment.image || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=375&fit=crop&crop=center"}
            alt={equipment.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className={cn("text-xs font-medium", getAvailabilityColor(equipment.availability))}>
              {getAvailabilityText(equipment.availability)}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs bg-black/50 text-white border-0">
              {equipment.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{equipment.subcategory}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{equipment.description}</p>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">${equipment.dailyRate}/day</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>${equipment.weeklyRate}/week</span>
              </div>
            </div>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{equipment.name}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={equipment.image || "https://images.unsplash.com/photo-1558618666-fcd44ded4cd4?w=500&h=375&fit=crop&crop=center"}
                        alt={equipment.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Specifications
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="text-foreground font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-4">{equipment.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge className={cn("text-xs", getAvailabilityColor(equipment.availability))}>
                            {getAvailabilityText(equipment.availability)}
                          </Badge>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Daily Rate:</span>
                            <span className="font-semibold text-foreground">${equipment.dailyRate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Weekly Rate:</span>
                            <span className="font-semibold text-foreground">${equipment.weeklyRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {equipment.availability === "available" && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="quantity" className="text-sm text-muted-foreground">
                              Quantity
                            </Label>
                            <Input
                              id="quantity"
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                              className="bg-input border-border"
                            />
                          </div>
                          <div>
                            <Label htmlFor="days" className="text-sm text-muted-foreground">
                              Rental Days
                            </Label>
                            <Select
                              value={rentalDays.toString()}
                              onValueChange={(value) => setRentalDays(Number.parseInt(value))}
                            >
                              <SelectTrigger className="bg-input border-border">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 14, 21, 30].map((days) => (
                                  <SelectItem key={days} value={days.toString()}>
                                    {days} {days === 1 ? "day" : "days"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <span className="text-sm text-muted-foreground">Total:</span>
                          <span className="text-lg font-bold text-primary">${calculateTotal()}</span>
                        </div>

                        <Button
                          onClick={handleAddToCart}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {equipment.availability === "available" ? (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <Button disabled className="w-full" variant="secondary" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            {equipment.availability === "rented" ? "Currently Rented" : "Under Maintenance"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
