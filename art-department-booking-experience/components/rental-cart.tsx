"use client"

import { useState } from "react"
import Image from "next/image"
import type { CartItem } from "./equipment-rental-system"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Plus, Minus, Calendar, DollarSign, ShoppingCart, CreditCard } from "lucide-react"

interface RentalCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (equipmentId: string) => void
  onUpdateItem: (equipmentId: string, quantity: number, rentalDays: number) => void
}

export function RentalCart({ isOpen, onClose, items, onRemoveItem, onUpdateItem }: RentalCartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const calculateItemTotal = (item: CartItem) => {
    const rate = item.rentalDays >= 7 ? item.weeklyRate : item.dailyRate
    const multiplier = item.rentalDays >= 7 ? Math.ceil(item.rentalDays / 7) : item.rentalDays
    return rate * multiplier * item.quantity
  }

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax rate
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return
    onUpdateItem(item.id, newQuantity, item.rentalDays)
  }

  const handleRentalDaysChange = (item: CartItem, newDays: number) => {
    onUpdateItem(item.id, item.quantity, newDays)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      alert("Checkout functionality would be implemented here")
    }, 2000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Rental Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some equipment to get started</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-muted/20 rounded-lg p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.subcategory}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <DollarSign className="h-3 w-3" />${item.dailyRate}/day
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Quantity</label>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item, Number.parseInt(e.target.value) || 1)}
                            className="h-8 text-center text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Rental Period</label>
                        <Select
                          value={item.rentalDays.toString()}
                          onValueChange={(value) => handleRentalDaysChange(item, Number.parseInt(value))}
                        >
                          <SelectTrigger className="h-8 text-sm">
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

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.quantity} × {item.rentalDays} {item.rentalDays === 1 ? "day" : "days"}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        ${calculateItemTotal(item).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%):</span>
                  <span className="text-foreground">${calculateTax().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="text-lg font-bold text-primary">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <Button variant="outline" onClick={onClose} className="w-full border-border bg-transparent">
                  Continue Shopping
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                <p>Equipment subject to availability</p>
                <p>Rental terms and conditions apply</p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
