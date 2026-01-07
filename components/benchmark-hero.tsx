import { BarChart3 } from "lucide-react"

export function BenchmarkHero() {
  return (
    <section className="relative bg-[#9cb8c8] grid-bg border-b-2 border-[#7a9ab0]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-black tracking-tight text-[#1a4a6a] md:text-7xl uppercase italic">
              WCW智能代码审查
              <br />
              评测报告 (2026)
            </h1>
            <p className="text-lg text-[#2a2a2a] max-w-xl font-medium">
              wcw 与 Greptile、Cursor、Copilot、CodeRabbit、Graphite 五款主流 AI 代码审查工具的全面对比评测。 基于 50
              个来自真实生产环境的 bug，看看谁才是真正的代码守护者。
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#1a4a6a] font-mono text-sm">
            <BarChart3 className="h-5 w-5" />
            <span>评测基准</span>
          </div>
        </div>
      </div>
    </section>
  )
}
