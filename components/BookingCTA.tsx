"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const BookingCTA = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Booking submitted")
    setIsBookingOpen(false)
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Capture Your Moment?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Book a session with Rea Jampane Studios and let's create magic together.
          </p>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Book Your Session</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" className="bg-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" className="bg-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <select id="service" className="w-full p-2 bg-gray-700 rounded-md text-white">
                    <option>Photography</option>
                    <option>Videography</option>
                    <option>Both</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  Submit Booking Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingCTA

