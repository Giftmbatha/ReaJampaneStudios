import Hero from "@/components/Hero"
import InteractivePortfolio from "@/components/InteractivePortfolio"
import Services from "@/components/Services"
import About from "@/components/About"
import BookingCTA from "@/components/BookingCTA"

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />
      <InteractivePortfolio />
      <Services />
      <About />
      <BookingCTA />
    </main>
  )
}

