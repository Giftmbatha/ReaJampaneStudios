import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

    return NextResponse.json({
      planTitle: lineItems.data[0]?.description,
      planPrice: `R${(lineItems.data[0]?.amount_total / 100).toFixed(2)}`,
    })
  } catch (error) {
    console.error("Error fetching session details:", error)
    return NextResponse.json({ error: "Failed to fetch session details" }, { status: 500 })
  }
}

