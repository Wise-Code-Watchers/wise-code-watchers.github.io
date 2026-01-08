"use client"

import { BarChart3 } from "lucide-react"
import { SeverityBarChart, OverallBarChart } from "@/components/ui/pixel-bar-chart"
import { Reveal } from "@/components/ui/reveal"
import { calculateToolStats } from "@/lib/benchmark-calculator"
import { useMemo } from "react"
import Image from "next/image"

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
    <section className="bg-background snap-start h-screen overflow-y-auto">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Overview 区域 */}
        <div className="mb-12">
          <Reveal>
            <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">概述</h2>
          </Reveal>
          <div className="space-y-4 text-muted-foreground">
            <Reveal delayMs={120}>
              <p>
              我们将 <span className="font-semibold text-[#3b82f6]">wcw</span> 与市面上 5 款主流 AI 代码审查工具
              （Greptile、Cursor、Copilot、CodeRabbit、Graphite）在 50 个真实 Pull Request 中进行了严格对比测试。
            </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p>
              所有工具均使用默认设置进行评测（无自定义规则或微调），测试覆盖 5 种编程语言、4 个严重程度级别，
              确保评测的公平性和全面性。
            </p>
            </Reveal>
            <Reveal delayMs={280}>
              <p>
              所有测试 PR 均来自公开可验证的开源代码仓库（Sentry、Cal.com、Grafana、Keycloak、Discourse），
              你可以点击任意结果查阅原始 PR 详情。
            </p>
            </Reveal>
          </div>
        </div>

        <Reveal delayMs={350}>
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
        </Reveal>

        {/* Greptile 数据更正 */}
        <Reveal delayMs={400}>
          <div className="bg-card border border-border rounded-sm mb-12">
            <div className="border-b border-border bg-[#9cb8c8]/30 px-6 py-4">
              <div className="flex items-center justify-center gap-2 text-foreground font-mono">
                <BarChart3 className="h-5 w-5" />
                <span>数据更正：Greptile HIGH 级别检测率</span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* 图片 */}
              <div className="flex justify-center">
                <Image
                  src="/high.png"
                  alt="Greptile HIGH级别检测率声称"
                  width={600}
                  height={300}
                  className="rounded border border-border"
                />
              </div>

              {/* 计算算法说明 */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2 text-sm">📊 检出率计算方法</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="font-mono bg-background p-2 rounded border">
                    检出率 = (正确检出的 bug 数 / 该严重程度 bug 总数) × 100%
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
                    <div className="bg-background p-2 rounded border">
                      <div className="font-medium text-foreground">HIGH 级别总数</div>
                      <div className="text-lg font-bold text-[#3b82f6]">17 个 bug</div>
                    </div>
                    <div className="bg-background p-2 rounded border">
                      <div className="font-medium text-foreground">Greptile 正确检出</div>
                      <div className="text-lg font-bold text-red-500">13 个</div>
                    </div>
                    <div className="bg-background p-2 rounded border">
                      <div className="font-medium text-foreground">Greptile 检出率</div>
                      <div className="text-lg font-bold text-red-500">76.5%</div>
                    </div>
                  </div>
                  <p className="pt-2 text-xs">
                    <span className="text-foreground font-medium">判定标准：</span>
                    每个工具对 50 个真实 bug 进行测试，
                    <code className="bg-background px-1 rounded">1</code> = 正确检出，
                    <code className="bg-background px-1 rounded">0</code> = 漏报，
                    <code className="bg-background px-1 rounded">-1</code> = 误报
                  </p>
                </div>
              </div>

              {/* 说明文字 */}
              <div className="space-y-3 text-muted-foreground text-sm">
                <p>
                  Greptile 宣称 HIGH 级别 <span className="font-semibold text-red-500">100%</span> 检测率，
                  但实际评测显示仅为 <span className="font-bold text-foreground">{greptileStats.bySeverity.HIGH.rate.toFixed(1)}%</span>
                  （{greptileStats.bySeverity.HIGH.correct}/17）。
                </p>
                <p>
                  Greptile 在 HIGH 级别漏检的关键漏洞包括：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                  <li>
                    <span className="text-foreground font-medium">Cal.com:</span>
                    SMS workflow 提醒系统漏洞（OR 条件导致所有工作流程提醒被删除）
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Grafana:</span>
                    AuthZ 缓存漏洞（缓存条目未过期导致永久许可被拒）
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Keycloak:</span>
                    权限管理漏洞（功能标志不一致导致权限被遗弃）
                  </li>
                </ul>
                <p className="pt-2">
                  <span className="text-[#3b82f6] font-semibold">wcw</span> 在以上所有 Greptile 漏检的关键案例中均成功检出，
                  HIGH 级别检测率达到 <span className="font-bold text-foreground">{wcwStats.bySeverity.HIGH.rate.toFixed(0)}%</span>。
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Performance 区域 */}
        <div className="grid lg:grid-cols-2 gap-12 border-t border-border pt-16">
          <div>
            <Reveal>
              <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">性能表现</h2>
            </Reveal>
            <div className="space-y-4 text-muted-foreground">
              <Reveal delayMs={120}>
                <p>
                <span className="font-semibold text-[#3b82f6]">wcw</span> 以{" "}
                <span className="font-bold text-foreground">{wcwStats.accuracy.toFixed(0)}%</span> 的综合检出率 位列第{" "}
                <span className="font-bold text-foreground">{wcwRank}</span> 名，
                <span className="font-semibold text-[#3b82f6]">大幅领先</span> Cursor（+{wcwLeadOverCursor.toFixed(0)}
                %）、 Copilot（+{wcwLeadOverCopilot.toFixed(0)}%）、CodeRabbit（+{wcwLeadOverCodeRabbit.toFixed(0)}%）、
                Graphite（+{wcwLeadOverGraphite.toFixed(0)}%）等主流工具。
              </p>
              </Reveal>
              <Reveal delayMs={200}>
                <p>
                在<span className="font-semibold text-red-500">严重（Critical）</span>级别 bug 检测中， wcw 检出率达到{" "}
                <span className="font-bold text-foreground">{wcwStats.bySeverity.CRITICAL.rate.toFixed(0)}%</span>； 在
                <span className="font-semibold text-orange-500">高危（High）</span>级别检测中更是达到{" "}
                <span className="font-bold text-foreground">{wcwStats.bySeverity.HIGH.rate.toFixed(0)}%</span>，
                展现出对关键安全漏洞的<span className="font-semibold text-[#3b82f6]">卓越捕获能力</span>。
              </p>
              </Reveal>
              <Reveal delayMs={280}>
                <p>
                尽管 Greptile 在综合检出率上以 {greptileStats.accuracy.toFixed(0)}% 暂居首位， 但其在 Keycloak 和
                Discourse 项目中存在{" "}
                <span className="text-red-500 font-medium">{greptileStats.totalFalsePositive} 处关键漏报</span>
                （标红行）， 这些被遗漏的严重 bug 在真实生产环境中可能导致安全事故。 wcw
                在这些关键案例中均成功检出，体现了更
                <span className="font-semibold text-[#3b82f6]">稳健可靠</span>的检测能力。
              </p>
              </Reveal>
            </div>
          </div>

          {/* Overall Performance 图表 */}
          <Reveal delayMs={200}>
            <div className="flex items-center justify-center">
              <OverallBarChart toolStats={toolStats} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
