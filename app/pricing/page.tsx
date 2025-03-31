"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import PaymentModal from "@/components/PaymentModal"

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const pricingPlans = [
    {
      title: "Basic Package",
      price: "R7,500",
      features: ["2-hour photo session", "50 edited digital images", "Online gallery", "1 11x14 print"],
    },
    {
      title: "Premium Package",
      price: "R15,000",
      features: [
        "4-hour photo session",
        "100 edited digital images",
        "Online gallery",
        "2 11x14 prints",
        "Custom photo album",
      ],
    },
    {
      title: "Cinematic Experience",
      price: "R30,000",
      features: [
        "Full-day video coverage",
        "5-minute highlight reel",
        "Full-length edited video",
        "Drone footage",
        "Licensed music",
      ],
    },
  ]

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Our Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{plan.title}</h2>
              <p className="text-4xl font-bold mb-6 text-white">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="text-white mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelection(plan)}
                className="w-full bg-white text-black py-2 rounded-full hover:bg-gray-200 transition duration-300"
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedPlan && (
        <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} plan={selectedPlan} />
      )}
    </div>
  )
}

export default PricingPage

