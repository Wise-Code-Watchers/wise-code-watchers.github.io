"use client"

import Image from "next/image"
import { Reveal } from "@/components/ui/reveal"

export function WCWArchitecture() {
  return (
    <section className="snap-start h-screen overflow-y-auto bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-8 md:mb-10">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              端到端工作流（Architecture）
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              从 PR 上下文抽取 → Diff 扩展 → 多 Agent 并行分析 → 风险评分聚焦 → GitHub 回写评论。
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={200}>
          <div className="rounded-2xl border border-border bg-card p-3 md:p-4 shadow-sm">
            {/* 关键：让图片在容器内自适应，并允许纵向滚动查看细节 */}
            <div className="relative w-full">
              <Image
                src="/architecture.png"
                alt="AI-Powered Pull Request Code Review System Architecture"
                width={2400}
                height={1350}
                priority
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
              <span>Tip: 在这一页可继续滚动查看图的细节</span>
              <span>·</span>
              <span>下一页进入评测概述与结果</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
