"use client"

import { motion } from "framer-motion"
import { Camera, Video, Edit2, Award, Zap, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Photography",
      icon: Camera,
      description: "Capturing moments that last a lifetime",
      tooltip: "High-quality photography for all occasions",
    },
    {
      id: 2,
      title: "Videography",
      icon: Video,
      description: "Bringing stories to life through motion",
      tooltip: "Professional video production services",
    },
    {
      id: 3,
      title: "Editing",
      icon: Edit2,
      description: "Perfecting every frame with precision",
      tooltip: "Expert post-production and editing",
    },
    {
      id: 4,
      title: "Creative Direction",
      icon: Award,
      description: "Guiding visions from concept to reality",
      tooltip: "Innovative creative direction for your projects",
    },
    {
      id: 5,
      title: "Fast Turnaround",
      icon: Zap,
      description: "Quick delivery without compromising quality",
      tooltip: "Efficient workflow for timely delivery",
    },
    {
      id: 6,
      title: "Collaborative Approach",
      icon: Users,
      description: "Working closely with clients to achieve their vision",
      tooltip: "Client-focused collaborative process",
    },
  ]

  return (
    <TooltipProvider>
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Tooltip key={service.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(255,255,255,0.1)" }}
                    className="bg-gray-900 p-6 rounded-lg text-center cursor-pointer"
                  >
                    <service.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{service.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

export default Services

