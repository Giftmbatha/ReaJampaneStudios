import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { paymentMethodId, planTitle, planPrice } = await req.json()

      // Create a customer
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: "customer@example.com", // You should get this from the user's input
      })

      // Create a session for the payment
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
          {
            price_data: {
              currency: "zar",
              product_data: {
                name: planTitle,
              },
              unit_amount: Number.parseInt(planPrice.replace(/[^0-9]/g, "")), // Convert price string to number
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.get("origin")}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/pricing`,
      })

      return NextResponse.json({ success: true, sessionId: session.id })
    } catch (error) {
      console.error("Error processing payment:", error)
      return NextResponse.json({ success: false, error: "Payment processing failed" })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

