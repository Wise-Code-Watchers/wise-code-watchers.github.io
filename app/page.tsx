import { BenchmarkHero } from "@/components/benchmark-hero"
import { BenchmarkOverview } from "@/components/benchmark-overview"
import { BenchmarkResults } from "@/components/benchmark-results"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <BenchmarkHero />
      <BenchmarkOverview />
      <BenchmarkResults />
    </main>
  )
}
