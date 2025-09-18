"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Camera, Lightbulb, Mic, Wrench, ChevronDown, ChevronRight } from "lucide-react"

interface CategorySidebarProps {
  categories: string[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
}

const categoryIcons = {
  All: Wrench,
  Cameras: Camera,
  Lighting: Lightbulb,
  Audio: Mic,
  Grip: Wrench,
}

const categoryStructure = {
  Cameras: {
    "Digital Cinema Cameras": ["ARRI Alexa", "RED Cameras", "Sony FX", "Canon C-Series"],
    "DSLR/Mirrorless": ["Canon EOS R", "Sony A7S", "Panasonic GH"],
    "Specialty Cameras": ["High Speed", "Underwater", "Action Cameras"],
    "Camera Accessories": ["Monitors", "Follow Focus", "Matte Boxes", "Wireless Video"],
  },
  Lighting: {
    "LED Panels": ["SkyPanel", "Gemini", "Nova"],
    "HMI Lights": ["M-Series", "Compact HMI", "Daylight HMI"],
    Tungsten: ["Blonde", "Redhead", "Open Face"],
    "Specialty Lighting": ["Practical", "RGB", "Tube Lights"],
    "Lighting Accessories": ["Stands", "Modifiers", "Gels", "Flags"],
  },
  Audio: {
    "Field Mixers": ["Sound Devices", "Zoom", "Tascam"],
    Microphones: ["Shotgun", "Lavalier", "Boom Poles"],
    "Wireless Systems": ["Sennheiser", "Lectrosonics", "Audio-Technica"],
    Recording: ["Field Recorders", "Audio Interfaces"],
    "Audio Accessories": ["Cables", "Windscreens", "Shock Mounts"],
  },
  Grip: {
    "Camera Support": ["Tripods", "Dollies", "Sliders", "Jibs"],
    Rigging: ["C-Stands", "Clamps", "Arms", "Sandbags"],
    Stabilization: ["Gimbals", "Steadicam", "Shoulder Rigs"],
    "Power & Distribution": ["Batteries", "Chargers", "Power Stations"],
    "Cases & Transport": ["Pelican Cases", "Carts", "Bags"],
  },
}

export function CategorySidebar({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Cameras"])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="w-72 bg-card border-r border-border p-4 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Equipment Rental</h1>
        <p className="text-sm text-muted-foreground">Professional Film & TV</p>
      </div>

      <nav className="space-y-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h2>

        {/* All Equipment Button */}
        <Button
          variant={selectedCategory === "All" ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-3 h-10 mb-2",
            selectedCategory === "All"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent",
          )}
          onClick={() => onCategorySelect("All")}
        >
          <Wrench className="h-4 w-4" />
          All Equipment
        </Button>

        {/* Category Accordions */}
        {Object.entries(categoryStructure).map(([category, subcategories]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons] || Wrench
          const isExpanded = expandedCategories.includes(category)
          const isSelected = selectedCategory === category

          return (
            <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
              <div className="space-y-1">
                <div className="flex">
                  <Button
                    variant={isSelected ? "default" : "ghost"}
                    className={cn(
                      "flex-1 justify-start gap-3 h-10",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                    onClick={() => onCategorySelect(category)}
                  >
                    <Icon className="h-4 w-4" />
                    {category}
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-10 p-0 text-muted-foreground hover:text-foreground"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-1">
                  {Object.entries(subcategories).map(([subcategory, items]) => (
                    <div key={subcategory} className="ml-4">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-8 text-xs font-medium",
                          selectedCategory === subcategory
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                        )}
                        onClick={() => onCategorySelect(subcategory)}
                      >
                        {subcategory}
                      </Button>

                      {/* Individual equipment types */}
                      <div className="ml-4 space-y-0.5">
                        {items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start h-7 text-xs",
                              selectedCategory === item
                                ? "bg-accent/50 text-accent-foreground"
                                : "text-muted-foreground/80 hover:text-foreground hover:bg-accent/30",
                            )}
                            onClick={() => onCategorySelect(item)}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )
        })}
      </nav>
    </div>
  )
}
