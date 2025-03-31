"use client"

import { motion } from "framer-motion"

const Portfolio = () => {
  const portfolioItems = [
    { id: 1, title: "Cinematic Short", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 2, title: "Portrait Series", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
    { id: 3, title: "Commercial Spot", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 4, title: "Wedding Collection", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
    { id: 5, title: "Music Video", image: "/placeholder.svg?height=400&width=600", category: "Video" },
    { id: 6, title: "Fashion Shoot", image: "/placeholder.svg?height=400&width=600", category: "Photography" },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gold">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gold">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio

