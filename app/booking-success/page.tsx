"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const BookingSuccessPage = () => {
  const [sessionDetails, setSessionDetails] = useState(null)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (sessionId) {
        const response = await fetch(`/api/get-session?session_id=${sessionId}`)
        const data = await response.json()
        setSessionDetails(data)
      }
    }

    fetchSessionDetails()
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Booking Successful!</h1>
        {sessionDetails ? (
          <div>
            <p className="mb-4">Thank you for booking with Rea Jampane Studios. Your session details are:</p>
            <ul className="list-disc list-inside mb-6">
              <li>Plan: {sessionDetails.planTitle}</li>
              <li>Price: {sessionDetails.planPrice}</li>
              <li>Session ID: {sessionId}</li>
            </ul>
          </div>
        ) : (
          <p className="mb-6">Loading session details...</p>
        )}
        <p className="mb-6">We'll be in touch shortly with more information about your upcoming session.</p>
        <Link
          href="/"
          className="block text-center bg-white text-black py-2 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default BookingSuccessPage

