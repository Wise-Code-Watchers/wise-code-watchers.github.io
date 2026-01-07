import { benchmarkData, tools, type Tool, type Severity } from "./benchmark-data"

export interface ToolStats {
  tool: Tool
  totalCorrect: number
  totalMissed: number
  totalFalsePositive: number
  totalBugs: number
  accuracy: number
  bySeverity: {
    CRITICAL: { correct: number; total: number; rate: number }
    HIGH: { correct: number; total: number; rate: number }
    MEDIUM: { correct: number; total: number; rate: number }
    LOW: { correct: number; total: number; rate: number }
  }
}

// 计算每个工具的统计数据
export function calculateToolStats(): ToolStats[] {
  return tools.map((tool) => {
    let totalCorrect = 0
    let totalMissed = 0
    let totalFalsePositive = 0
    let totalBugs = 0

    const severityStats = {
      CRITICAL: { correct: 0, total: 0 },
      HIGH: { correct: 0, total: 0 },
      MEDIUM: { correct: 0, total: 0 },
      LOW: { correct: 0, total: 0 },
    }

    // 遍历所有项目和bug
    benchmarkData.forEach((project) => {
      project.bugs.forEach((bug) => {
        totalBugs++
        const result = bug[tool]

        // 统计总体结果
        if (result === 1) {
          totalCorrect++
        } else if (result === 0) {
          totalMissed++
        } else if (result === -1) {
          totalFalsePositive++
        }

        // 按严重程度统计
        severityStats[bug.severity].total++
        if (result === 1) {
          severityStats[bug.severity].correct++
        }
      })
    })

    return {
      tool,
      totalCorrect,
      totalMissed,
      totalFalsePositive,
      totalBugs,
      accuracy: (totalCorrect / totalBugs) * 100,
      bySeverity: {
        CRITICAL: {
          ...severityStats.CRITICAL,
          rate: (severityStats.CRITICAL.correct / severityStats.CRITICAL.total) * 100,
        },
        HIGH: {
          ...severityStats.HIGH,
          rate: (severityStats.HIGH.correct / severityStats.HIGH.total) * 100,
        },
        MEDIUM: {
          ...severityStats.MEDIUM,
          rate: (severityStats.MEDIUM.correct / severityStats.MEDIUM.total) * 100,
        },
        LOW: {
          ...severityStats.LOW,
          rate: (severityStats.LOW.correct / severityStats.LOW.total) * 100,
        },
      },
    }
  })
}

// 获取特定工具的统计数据
export function getToolStats(tool: Tool): ToolStats {
  const allStats = calculateToolStats()
  return allStats.find((stats) => stats.tool === tool)!
}

// 获取所有工具在特定严重程度下的表现
export function getToolsBySeverity(severity: Severity) {
  const allStats = calculateToolStats()
  return allStats
    .map((stats) => ({
      tool: stats.tool,
      correct: stats.bySeverity[severity].correct,
      total: stats.bySeverity[severity].total,
      rate: stats.bySeverity[severity].rate,
    }))
    .sort((a, b) => b.rate - a.rate)
}
