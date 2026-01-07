import { BenchmarkHero } from "@/components/benchmark-hero"
import { WCWStory } from "@/components/wcw-story"
import { WCWArchitecture } from "@/components/wcw-architecture"
import { BenchmarkOverview } from "@/components/benchmark-overview"
import { BenchmarkResults } from "@/components/benchmark-results"

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background">
      <BenchmarkHero />
      <WCWStory />
      <WCWArchitecture />
      <BenchmarkOverview />
      <BenchmarkResults />
    </main>
  )
}
