import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MetricCardProps = {
  label: string
  value: string
  detail: string
  trend?: string
  tone?: "positive" | "neutral" | "negative"
  className?: string
}

export function MetricCard({
  label,
  value,
  detail,
  trend,
  tone = "neutral",
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("gap-0 rounded-xl shadow-none", className)}>
      <CardHeader className="flex-row items-start justify-between gap-4 pb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {trend ? (
          <Badge
            variant="outline"
            className={cn(
              "font-mono tabular-nums",
              tone === "positive" && "text-emerald-700 dark:text-emerald-400",
              tone === "negative" && "text-red-700 dark:text-red-400"
            )}
          >
            {trend}
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent>
        <strong className="block text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </strong>
        <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}
