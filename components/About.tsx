"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Phone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const About = () => {
  const socialMedia = [
    { name: "Instagram", icon: Instagram, link: "https://instagram.com/reajampane", tooltip: "Follow on Instagram" },
    { name: "Facebook", icon: Facebook, link: "https://facebook.com/reajampanestudios", tooltip: "Like on Facebook" },
    { name: "WhatsApp", icon: Phone, link: "https://wa.me/1234567890", tooltip: "Chat on WhatsApp" },
  ]

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <img src="/placeholder.svg?height=600&width=600" alt="Rea Jampane" className="rounded-lg shadow-2xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 lg:pl-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">About Rea Jampane</h2>
            <p className="text-lg mb-6 text-gray-300">
              Rea Jampane is a visionary photographer and cinematographer with a passion for storytelling through visual
              arts. With years of experience in the industry, Rea has developed a unique style that blends technical
              expertise with artistic flair.
            </p>
            <p className="text-lg mb-6 text-gray-300">
              From intimate weddings to large-scale commercial productions, Rea brings a keen eye for detail and a
              commitment to excellence to every project. His work has been featured in numerous publications and has
              earned him a reputation as one of the most sought-after visual artists in the industry.
            </p>
            <TooltipProvider>
              <div className="flex space-x-4">
                {socialMedia.map((platform) => (
                  <Tooltip key={platform.name}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition duration-300"
                      >
                        <platform.icon className="w-6 h-6" />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{platform.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

