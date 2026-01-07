"use client"

import { BarChart3 } from "lucide-react"
import { SeverityBarChart, OverallBarChart } from "@/components/ui/pixel-bar-chart"
import { calculateToolStats } from "@/lib/benchmark-calculator"
import { useMemo } from "react"

export function BenchmarkOverview() {
  const toolStats = useMemo(() => calculateToolStats(), [])

  const wcwStats = toolStats.find((stat) => stat.tool === "wcw")!
  const greptileStats = toolStats.find((stat) => stat.tool === "Greptile")!
  const cursorStats = toolStats.find((stat) => stat.tool === "Cursor")!
  const copilotStats = toolStats.find((stat) => stat.tool === "Copilot")!
  const coderabbitStats = toolStats.find((stat) => stat.tool === "CodeRabbit")!
  const graphiteStats = toolStats.find((stat) => stat.tool === "Graphite")!

  const wcwLeadOverCursor = wcwStats.accuracy - cursorStats.accuracy
  const wcwLeadOverCopilot = wcwStats.accuracy - copilotStats.accuracy
  const wcwLeadOverCodeRabbit = wcwStats.accuracy - coderabbitStats.accuracy
  const wcwLeadOverGraphite = wcwStats.accuracy - graphiteStats.accuracy

  // 计算排名
  const sortedStats = [...toolStats].sort((a, b) => b.accuracy - a.accuracy)
  const wcwRank = sortedStats.findIndex((s) => s.tool === "wcw") + 1

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Overview 区域 */}
        <div className="mb-12">
          <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">概述</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              我们将 <span className="font-semibold text-[#3b82f6]">wcw</span> 与市面上 5 款主流 AI 代码审查工具
              （Greptile、Cursor、Copilot、CodeRabbit、Graphite）在 50 个真实 Pull Request 中进行了严格对比测试。
            </p>
            <p>
              所有工具均使用默认设置进行评测（无自定义规则或微调），测试覆盖 5 种编程语言、4 个严重程度级别，
              确保评测的公平性和全面性。
            </p>
            <p>
              所有测试 PR 均来自公开可验证的开源代码仓库（Sentry、Cal.com、Grafana、Keycloak、Discourse），
              你可以点击任意结果查阅原始 PR 详情。
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm mb-20">
          <div className="border-b border-border bg-[#9cb8c8]/30 px-6 py-4">
            <div className="flex items-center justify-center gap-2 text-foreground font-mono">
              <BarChart3 className="h-5 w-5" />
              <span>按严重程度划分的 Bug 检出率</span>
            </div>
          </div>
          <div className="p-6">
            <SeverityBarChart toolStats={toolStats} />
          </div>
        </div>

        {/* Performance 区域 */}
        <div className="grid lg:grid-cols-2 gap-12 border-t border-border pt-16">
          <div>
            <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">性能表现</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-[#3b82f6]">wcw</span> 以{" "}
                <span className="font-bold text-foreground">{wcwStats.accuracy.toFixed(0)}%</span> 的综合检出率 位列第{" "}
                <span className="font-bold text-foreground">{wcwRank}</span> 名，
                <span className="font-semibold text-[#3b82f6]">大幅领先</span> Cursor（+{wcwLeadOverCursor.toFixed(0)}
                %）、 Copilot（+{wcwLeadOverCopilot.toFixed(0)}%）、CodeRabbit（+{wcwLeadOverCodeRabbit.toFixed(0)}%）、
                Graphite（+{wcwLeadOverGraphite.toFixed(0)}%）等主流工具。
              </p>
              <p>
                在<span className="font-semibold text-red-500">严重（Critical）</span>级别 bug 检测中， wcw 检出率达到{" "}
                <span className="font-bold text-foreground">{wcwStats.bySeverity.CRITICAL.rate.toFixed(0)}%</span>； 在
                <span className="font-semibold text-orange-500">高危（High）</span>级别检测中更是达到{" "}
                <span className="font-bold text-foreground">{wcwStats.bySeverity.HIGH.rate.toFixed(0)}%</span>，
                展现出对关键安全漏洞的<span className="font-semibold text-[#3b82f6]">卓越捕获能力</span>。
              </p>
              <p>
                尽管 Greptile 在综合检出率上以 {greptileStats.accuracy.toFixed(0)}% 暂居首位， 但其在 Keycloak 和
                Discourse 项目中存在{" "}
                <span className="text-red-500 font-medium">{greptileStats.totalFalsePositive} 处关键漏报</span>
                （标红行）， 这些被遗漏的严重 bug 在真实生产环境中可能导致安全事故。 wcw
                在这些关键案例中均成功检出，体现了更
                <span className="font-semibold text-[#3b82f6]">稳健可靠</span>的检测能力。
              </p>
            </div>
          </div>

          {/* Overall Performance 图表 */}
          <div className="flex items-center justify-center">
            <OverallBarChart toolStats={toolStats} />
          </div>
        </div>
      </div>
    </section>
  )
}
