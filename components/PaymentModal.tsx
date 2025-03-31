"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutForm = ({ plan, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      setPaymentError(error.message)
      setIsProcessing(false)
    } else {
      // Send paymentMethod.id to your server for processing
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          planTitle: plan.title,
          planPrice: plan.price,
        }),
      })

      const result = await response.json()

      if (result.success) {
        onSuccess(result.sessionId)
      } else {
        setPaymentError(result.error)
      }
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="bg-gray-700 p-4 rounded-md mb-4" />
      {paymentError && <div className="text-red-500 mb-4">{paymentError}</div>}
      <Button type="submit" disabled={isProcessing} className="w-full">
        {isProcessing ? "Processing..." : `Pay ${plan.price}`}
      </Button>
    </form>
  )
}

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [stripeError, setStripeError] = useState(null)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setStripeError("Stripe publishable key is not set")
    }
  }, [])

  const handlePaymentSuccess = (sessionId) => {
    // Redirect to success page or show success message
    console.log("Payment successful! Session ID:", sessionId)
    onClose()
  }

  if (stripeError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Error</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-red-500">{stripeError}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Complete Your Booking</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
          <p className="text-gray-300 mb-4">{plan.price}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} onSuccess={handlePaymentSuccess} />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal

