"use client"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, AlertTriangle, Calendar, GitBranch, Shield, Tag, ExternalLink } from "lucide-react"
import { benchmarkData, tools } from "@/lib/benchmark-data"

const projectIcons: Record<string, React.ReactNode> = {
  Sentry: <Shield className="h-4 w-4" />,
  "Cal.com": <Calendar className="h-4 w-4" />,
  Grafana: <GitBranch className="h-4 w-4" />,
  Keycloak: <Shield className="h-4 w-4" />,
  Discourse: <Tag className="h-4 w-4" />,
}

const projectLanguages: Record<string, string> = {
  Sentry: "Python",
  "Cal.com": "TypeScript",
  Grafana: "Go",
  Keycloak: "Java",
  Discourse: "Ruby",
}

const severityLabels: Record<string, string> = {
  CRITICAL: "严重",
  HIGH: "高危",
  MEDIUM: "中等",
  LOW: "低危",
}

function getSeverityStyle(severity: string) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-100 text-red-700 border border-red-300"
    case "HIGH":
      return "bg-amber-100 text-amber-700 border border-amber-300"
    case "MEDIUM":
      return "bg-blue-100 text-blue-700 border border-blue-300"
    case "LOW":
      return "bg-gray-100 text-gray-600 border border-gray-300"
    default:
      return "bg-gray-100 text-gray-600 border border-gray-300"
  }
}

function ResultIcon({ value, isWcw }: { value: number; isWcw?: boolean }) {
  if (value === 1) {
    return (
      <div className={`w-6 h-6 rounded-sm flex items-center justify-center ${isWcw ? "bg-[#dbeafe]" : "bg-[#e8f5e9]"}`}>
        <Check className={`h-4 w-4 ${isWcw ? "text-[#3b82f6]" : "text-[#4caf50]"}`} />
      </div>
    )
  } else if (value === 0) {
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <X className="h-4 w-4 text-muted-foreground/40" />
      </div>
    )
  } else if (value === -1) {
    return (
      <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-amber-100">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
      </div>
    )
  }
  return null
}

function ResultCell({ value, isHighlight, isWcw }: { value: number; isHighlight: boolean; isWcw?: boolean }) {
  if (isHighlight && value === 0) {
    return (
      <div className="relative flex justify-center items-center">
        <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-red-100 border border-red-300">
          <X className="h-4 w-4 text-red-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center">
      <ResultIcon value={value} isWcw={isWcw} />
    </div>
  )
}

function ResultCellWithLink({
  value,
  isHighlight,
  isWcw,
  href,
}: {
  value: number
  isHighlight: boolean
  isWcw?: boolean
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center items-center w-full h-full"
      title="查看 GitHub PR"
    >
      {/* 右上角链接图标 - hover时显示，由父组件控制 */}
      <ExternalLink className="absolute top-2 right-2 h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {isHighlight && value === 0 ? (
        <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-red-100 border border-red-300">
          <X className="h-4 w-4 text-red-500" />
        </div>
      ) : (
        <ResultIcon value={value} isWcw={isWcw} />
      )}
    </a>
  )
}

function calculateProjectCatches(project: (typeof benchmarkData)[0]) {
  const catches: Record<string, number> = {}
  tools.forEach((tool) => {
    catches[tool] = project.bugs.filter((bug) => bug[tool] === 1).length
  })
  return catches
}

export function BenchmarkResults() {
  const [activeProject, setActiveProject] = useState(benchmarkData[0].name)

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">测试数据集</h2>
          <p className="text-muted-foreground max-w-3xl text-lg">
            测试涵盖 5 个不同编程语言的知名开源项目，每个项目包含 10 个精选的真实 bug 修复案例。
            点击任意单元格可查看对应工具在该 PR 中的实际审查表现，直观对比{" "}
            <span className="font-semibold text-[#3b82f6]">wcw</span> 与其他工具的差异。
          </p>
        </div>

        <Tabs value={activeProject} onValueChange={setActiveProject}>
          <TabsList className="mb-8 h-auto p-0 bg-transparent border-b-0 rounded-none w-full justify-start gap-2 flex-wrap">
            {benchmarkData.map((project) => (
              <TabsTrigger
                key={project.name}
                value={project.name}
                className="flex items-center gap-2 px-6 py-3 rounded-sm border-2 border-dashed border-gray-300 data-[state=active]:border-[#3b82f6] data-[state=active]:border-solid data-[state=active]:bg-[#dbeafe] data-[state=active]:text-[#1e40af] font-mono text-sm hover:bg-muted/50 transition-colors"
              >
                {projectIcons[project.name]}
                <span className="uppercase">{project.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {benchmarkData.map((project) => (
            <TabsContent key={project.name} value={project.name}>
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border bg-muted/30">
                        <TableHead className="min-w-[350px] font-mono text-xs uppercase">PR / Bug 描述</TableHead>
                        <TableHead className="text-center font-mono text-xs uppercase w-[100px]">严重程度</TableHead>
                        {tools.map((tool) => (
                          <TableHead
                            key={tool}
                            className={`text-center font-mono text-xs uppercase w-[100px] ${
                              tool === "wcw" ? "bg-[#bfdbfe]" : ""
                            }`}
                          >
                            {tool.toUpperCase()}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.bugs.map((bug, index) => {
                        const isGreptileMissRow = bug.Greptile === -1

                        return (
                          <TableRow
                            key={index}
                            className={`border-border ${isGreptileMissRow ? "bg-red-50" : "hover:bg-muted/20"}`}
                          >
                            <TableCell className="py-4">
                              <div className="space-y-1">
                                <div className="font-semibold text-sm leading-snug">
                                  {bug.description.split("\n")[0]}
                                </div>
                                <div className="text-xs text-muted-foreground leading-snug">
                                  {bug.description.split("\n")[1]}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`inline-block px-2 py-1 text-xs font-mono rounded-sm ${getSeverityStyle(bug.severity)}`}
                              >
                                {severityLabels[bug.severity] || bug.severity}
                              </span>
                            </TableCell>
                            {tools.map((tool) => {
                              const isWcw = tool === "wcw"
                              const prLink = getGitHubPRLink(project.name, tool, index)
                              const isHighlightCell = tool === "Greptile" && bug.Greptile === -1

                              return (
                                <TableCell
                                  key={tool}
                                  className={`text-center p-0 relative group transition-all duration-200 hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${isWcw ? "bg-[#bfdbfe]/30" : ""}`}
                                >
                                  <ResultCellWithLink
                                    value={bug[tool]}
                                    isHighlight={isHighlightCell}
                                    isWcw={isWcw}
                                    href={prLink}
                                  />
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}

                      {(() => {
                        const catches = calculateProjectCatches(project)
                        return (
                          <TableRow className="border-t-2 border-border bg-muted/20">
                            <TableCell className="py-4">
                              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                                检出总数
                              </span>
                            </TableCell>
                            <TableCell></TableCell>
                            {tools.map((tool) => {
                              const isWcw = tool === "wcw"
                              return (
                                <TableCell
                                  key={tool}
                                  className={`text-center font-mono text-sm ${
                                    isWcw ? "bg-[#bfdbfe]/30 font-bold text-[#1e40af]" : "text-muted-foreground"
                                  }`}
                                >
                                  {catches[tool]}/10
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })()}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* 图例说明 */}
        <div className="mt-8 p-6 bg-card border border-border rounded-sm">
          <div className="flex flex-wrap items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-[#dbeafe]">
                <Check className="h-4 w-4 text-[#3b82f6]" />
              </div>
              <span className="text-muted-foreground">wcw 检出</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-[#e8f5e9]">
                <Check className="h-4 w-4 text-[#4caf50]" />
              </div>
              <span className="text-muted-foreground">其他工具检出</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground/40" />
              </div>
              <span className="text-muted-foreground">漏报</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-muted-foreground">误报，整行标红</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getGitHubPRLink(projectName: string, tool: string, index: number): string {
  const projectSlug = projectName.toLowerCase().replace(/\./g, "")
  const prId = index + 1

  if (tool === "wcw") {
    return `https://github.com/Wise-Code-Watchers/${projectSlug}-wcw/pull/${prId}`
  } else {
    const toolSlug = tool.toLowerCase()
    return `https://github.com/ai-code-review-evaluation/${projectSlug}-${toolSlug}/pull/${prId}`
  }
}
