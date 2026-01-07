import { BenchmarkHero } from "@/components/benchmark-hero"
import { BenchmarkOverview } from "@/components/benchmark-overview"
import { BenchmarkResults } from "@/components/benchmark-results"

export default function Home() {
  return (
    // Full-page scrolling: each section is a "page" and scroll snaps to the next section.
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background">
      <BenchmarkHero />
      <BenchmarkOverview />
      <BenchmarkResults />
    </main>
  )
}
