"use client"

import { useState } from "react"
import { Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export interface FilterOptions {
  availability: string[]
  priceRange: [number, number]
  sortBy: string
}

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  cartItemCount: number
  onCartToggle: () => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

export function SearchHeader({
  searchQuery,
  onSearchChange,
  cartItemCount,
  onCartToggle,
  filters,
  onFiltersChange,
}: SearchHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const availabilityOptions = [
    { value: "available", label: "Available" },
    { value: "rented", label: "Currently Rented" },
    { value: "maintenance", label: "Under Maintenance" },
  ]

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "category", label: "Category" },
  ]

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, availability]
      : filters.availability.filter((a) => a !== availability)

    onFiltersChange({
      ...filters,
      availability: newAvailability,
    })
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange: range,
    })
  }

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      availability: [],
      priceRange: [0, 2000],
      sortBy: "name",
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.availability.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++
    if (filters.sortBy !== "name") count++
    return count
  }

  return (
    <header className="bg-card border-b border-border p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment, brands, or specifications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-accent"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative border-border hover:bg-accent bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card border-border" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Filters</h4>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-1 text-xs">
                    Clear All
                  </Button>
                </div>

                <Separator />

                {/* Sort By */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Sort By</Label>
                  <Select value={filters.sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Availability</Label>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={filters.availability.includes(option.value)}
                          onCheckedChange={(checked) => handleAvailabilityChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={option.value} className="text-sm text-muted-foreground cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Daily Rate Range</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={2000}
                      min={0}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="sm"
            onClick={onCartToggle}
            className="relative border-border hover:bg-accent bg-transparent"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || getActiveFilterCount() > 0) && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-muted-foreground">Active filters:</span>

          {searchQuery && (
            <Badge variant="secondary" className="text-xs">
              Search: "{searchQuery}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange("")}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.availability.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              Availability: {filters.availability.join(", ")}
            </Badge>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
            <Badge variant="secondary" className="text-xs">
              Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Badge>
          )}

          {filters.sortBy !== "name" && (
            <Badge variant="secondary" className="text-xs">
              Sort: {sortOptions.find((opt) => opt.value === filters.sortBy)?.label}
            </Badge>
          )}
        </div>
      )}
    </header>
  )
}
