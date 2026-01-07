"use client"

import { cn } from "@/lib/utils"
import type { ToolStats } from "@/lib/benchmark-calculator"

const TOOL_COLORS: Record<string, { fill: string; border: string; text: string }> = {
  wcw: { fill: "#bfdbfe", border: "#3b82f6", text: "#2563eb" },
  Greptile: { fill: "#c8e6c9", border: "#4caf50", text: "#2e7d32" },
  Cursor: { fill: "#f8bbd0", border: "#e91e63", text: "#c2185b" },
  Copilot: { fill: "#fff9c4", border: "#fbc02d", text: "#f57f17" },
  CodeRabbit: { fill: "#ffccbc", border: "#ff5722", text: "#e64a19" },
  Graphite: { fill: "#e0e0e0", border: "#9e9e9e", text: "#616161" },
}

interface SeverityBarChartProps {
  toolStats: ToolStats[]
  severityFilter?: "CRITICAL" | "HIGH" | "MEDIUM_LOW"
  compact?: boolean
  className?: string
}

export function SeverityBarChart({ toolStats, severityFilter, compact = false, className }: SeverityBarChartProps) {
  // 排序：wcw排第一
  const orderedTools = [...toolStats.filter((t) => t.tool === "wcw"), ...toolStats.filter((t) => t.tool !== "wcw")]

  const getValue = (stat: ToolStats) => {
    if (!severityFilter) {
      return stat.accuracy
    }
    if (severityFilter === "MEDIUM_LOW") {
      return (stat.bySeverity.MEDIUM.rate + stat.bySeverity.LOW.rate) / 2
    }
    return stat.bySeverity[severityFilter].rate
  }

  const maxHeight = compact ? 100 : 140

  if (compact) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="flex items-end justify-center gap-2">
          {orderedTools.map((stat) => {
            const value = getValue(stat)
            const height = (value / 100) * maxHeight
            const colors = TOOL_COLORS[stat.tool] || { fill: "#e5e5e5", border: "#9e9e9e", text: "#616161" }
            const isWcw = stat.tool === "wcw"

            return (
              <div key={stat.tool} className="flex flex-col items-center">
                <span
                  className={cn("text-[10px] mb-1", isWcw ? "font-bold" : "font-medium")}
                  style={{ color: colors.text }}
                >
                  {value.toFixed(0)}%
                </span>
                <div
                  className="transition-all duration-300"
                  style={{
                    width: "18px",
                    height: `${Math.max(height, 8)}px`,
                    backgroundColor: colors.fill,
                    border: `2px dashed ${colors.border}`,
                  }}
                />
                <span className="text-[9px] text-muted-foreground mt-1 truncate w-[24px] text-center">
                  {stat.tool.slice(0, 3)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const severities = [
    { key: "CRITICAL" as const, label: "严重" },
    { key: "HIGH" as const, label: "高危" },
    { key: "MEDIUM" as const, label: "中等" },
    { key: "LOW" as const, label: "低危" },
  ]

  return (
    <div className={cn("space-y-6 w-full", className)}>
      {/* 图例 */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {orderedTools.map((stat) => {
          const colors = TOOL_COLORS[stat.tool] || { fill: "#e5e5e5", border: "#9e9e9e", text: "#616161" }
          return (
            <div key={stat.tool} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3"
                style={{
                  backgroundColor: colors.fill,
                  border: `1.5px dashed ${colors.border}`,
                }}
              />
              <span className="text-xs text-muted-foreground">{stat.tool}</span>
            </div>
          )
        })}
      </div>

      <div className="w-full">
        <div className="flex justify-around items-end">
          {severities.map((severity) => (
            <div key={severity.key} className="flex flex-col items-center">
              <div className="flex items-end justify-center gap-[1px] h-[140px]">
                {orderedTools.map((stat) => {
                  const value = stat.bySeverity[severity.key].rate
                  const height = (value / 100) * maxHeight
                  const colors = TOOL_COLORS[stat.tool] || { fill: "#e5e5e5", border: "#9e9e9e", text: "#616161" }
                  const isWcw = stat.tool === "wcw"

                  return (
                    <div key={stat.tool} className="flex flex-col items-center">
                      <span
                        className={cn(
                          "text-[9px] sm:text-[10px] mb-1 whitespace-nowrap",
                          isWcw ? "font-bold" : "font-medium",
                        )}
                        style={{ color: colors.text }}
                      >
                        {value.toFixed(0)}%
                      </span>
                      <div
                        className="transition-all duration-300"
                        style={{
                          width: "20px",
                          height: `${Math.max(height, 6)}px`,
                          backgroundColor: colors.fill,
                          border: `2px dashed ${colors.border}`,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <span className="mt-2 text-xs font-medium text-foreground">{severity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface OverallBarChartProps {
  toolStats: ToolStats[]
  className?: string
}

export function OverallBarChart({ toolStats, className }: OverallBarChartProps) {
  // 按准确率排序（降序）
  const sortedTools = [...toolStats].sort((a, b) => b.accuracy - a.accuracy)
  const maxHeight = 140

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="flex items-end justify-center gap-2">
        {sortedTools.map((stat) => {
          const height = (stat.accuracy / 100) * maxHeight
          const colors = TOOL_COLORS[stat.tool] || { fill: "#e5e5e5", border: "#9e9e9e", text: "#616161" }
          const isWcw = stat.tool === "wcw"

          return (
            <div key={stat.tool} className="flex flex-col items-center">
              <span className={cn("text-xs mb-2", isWcw ? "font-bold" : "font-medium")} style={{ color: colors.text }}>
                {stat.accuracy.toFixed(0)}%
              </span>
              <div
                className="transition-all duration-300"
                style={{
                  width: "36px",
                  height: `${Math.max(height, 8)}px`,
                  backgroundColor: colors.fill,
                  border: `2px dashed ${colors.border}`,
                }}
              />
              <span className="text-[10px] text-muted-foreground mt-2 font-medium">{stat.tool}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
