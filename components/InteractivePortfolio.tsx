"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const InteractivePortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const portfolioItems = [
    { id: 1, title: "Cinematic Short", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 2, title: "Portrait Series", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
    { id: 3, title: "Commercial Spot", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 4, title: "Wedding Collection", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
    { id: 5, title: "Music Video", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 6, title: "Fashion Shoot", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
  ]

  const filteredItems =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <TooltipProvider>
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Portfolio</h2>
          <div className="flex justify-center mb-8 space-x-4">
            {["All", "Photography", "Video"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category ? "bg-white text-black" : "bg-gray-800 text-white"
                } transition duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                          <p className="text-gray-300">{item.category}</p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition duration-300">
                                View Details
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to see more about this {item.category.toLowerCase()} project</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  )
}

export default InteractivePortfolio

