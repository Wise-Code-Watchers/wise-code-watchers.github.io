"use client"

import { Reveal } from "@/components/ui/reveal"
import { AlertTriangle, Boxes, Sparkles, CheckCircle2 } from "lucide-react"

export function WCWStory() {
  return (
    <section className="snap-start h-screen overflow-y-auto bg-background relative">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* 标题 */}
        <div className="mb-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              为什么现在需要 <span className="text-[#3b82f6]">Wise Code Watchers</span>
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-muted-foreground max-w-3xl">
              把“代码审查”从人工密集型、噪声很高的流程，升级为可解释、可过滤、可回写到 PR 的智能工作流。
            </p>
          </Reveal>
        </div>

        {/* 三列卡片 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Why Now */}
          <Reveal>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#9cb8c8]/30 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-mono text-muted-foreground">1️⃣ Why Now</div>
                  <div className="text-xl font-bold">你要解决的痛点</div>
                </div>
              </div>

              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>• PR 规模大、改动复杂，人工 Review 耗时且遗漏率高</li>
                <li>• 安全漏洞与逻辑缺陷往往上线后才暴露，修复成本高</li>
                <li>• 传统工具（lint / scanner）只“报规则”，缺少上下文理解与跨文件推理</li>
                <li>• Review 结果无法聚焦，开发者常被低质量噪声干扰</li>
              </ul>
            </div>
          </Reveal>

          {/* What */}
          <Reveal delayMs={120}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#9cb8c8]/30 flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-mono text-muted-foreground">2️⃣ What</div>
                  <div className="text-xl font-bold">我们的解决方案</div>
                </div>
              </div>

              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">
                  Wise Code Watchers = GitHub App + LangGraph 多 Agent 工作流
                </p>
                <ul className="space-y-2">
                  <li>• 自动读取 PR diff / commits / metadata</li>
                  <li>• 多 Agent 并行分析：逻辑 / 安全 / 语法 / 结构</li>
                  <li>• 通过风险评分与过滤机制，只输出高价值问题</li>
                  <li>• 自动以行内评论 + 总结回写到 GitHub PR</li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Key Features */}
          <Reveal delayMs={220}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#9cb8c8]/30 flex items-center justify-center">
                  <Boxes className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-mono text-muted-foreground">3️⃣ Key Features</div>
                  <div className="text-xl font-bold">核心能力</div>
                </div>
              </div>

              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                {[
                  "多 Agent 并行协作（LangGraph Workflow）",
                  "Security Agent + Semgrep 证据先行漏洞检测",
                  "Logic Agent 深度逻辑缺陷推理（支持 Semgrep 证据增强）",
                  "跨文件影响分析（Cross-file Impact）",
                  "风险评分系统（相关性/严重性/置信度）自动筛噪",
                  "深度 GitHub 集成（Webhook 触发、PR Inline comments）",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-[#3b82f6]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 页脚提示 */}
        <Reveal delayMs={350}>
          <div className="mt-12 text-sm text-muted-foreground">
            ↓ 向下滚动继续查看评测概述与数据结果
          </div>
        </Reveal>
      </div>
    </section>
  )
}
