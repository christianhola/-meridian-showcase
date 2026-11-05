# Código completo de Charts — shadcn/ui

Fuente oficial de cada galería. Cada bloque contiene el código fuente completo serializado por la página para sus ejemplos; se separa por categoría y conserva el nombre del área.

## Area Charts

Fuente: https://ui.shadcn.com/charts/area


### Código completo 1

```tsx
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
c8:T15710,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> *</span><span style="color:#D73A49;--shiki-dark:#F97583"> as</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { Area, AreaChart, CartesianGrid, XAxis } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartLegend,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartLegendContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Select,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  SelectContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  SelectItem,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  SelectTrigger,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  SelectValue,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/select"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "An interactive area chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">222</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">97</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">167</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">242</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">260</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">373</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">301</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">245</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">409</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">59</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">110</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">261</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">327</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">292</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">342</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">360</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">364</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">243</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">89</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">224</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">387</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">215</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">75</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">383</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">122</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">454</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">165</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">247</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">481</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">390</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">498</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">388</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">300</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">227</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">330</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">335</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">473</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">338</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">499</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">235</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">177</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">82</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">252</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">201</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">213</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">460</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">233</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">78</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">280</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-31"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">470</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">439</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">88</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">323</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">370</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">438</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">155</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">92</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">492</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">426</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">307</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">371</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">475</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">107</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">341</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">408</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">450</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">169</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">317</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">530</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">132</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">141</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">434</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  visitors: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Visitors"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  desktop: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  mobile: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Mobile"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartAreaInteractive</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="color:#005CC5;--shiki-dark:#79B8FF">timeRange</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">setTimeRange</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">useState</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"90d"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> filteredData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chartData.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">filter</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">item</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> date</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(item.date)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> referenceDate</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    let</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> daysToSubtract </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 90</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    if</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (timeRange </span><span style="color:#D73A49;--shiki-dark:#F97583">===</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "30d"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      daysToSubtract </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 30</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    } </span><span style="color:#D73A49;--shiki-dark:#F97583">else</span><span style="color:#D73A49;--shiki-dark:#F97583"> if</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (timeRange </span><span style="color:#D73A49;--shiki-dark:#F97583">===</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "7d"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      daysToSubtract </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 7</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> startDate</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(referenceDate)</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    startDate.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">setDate</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(startDate.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">getDate</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() </span><span style="color:#D73A49;--shiki-dark:#F97583">-</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> daysToSubtract)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">    return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> date </span><span style="color:#D73A49;--shiki-dark:#F97583">>=</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> startDate</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  })</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"pt-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"grid flex-1 gap-1"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Area Chart - Interactive&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            Showing total visitors for the last 3 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Select</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{timeRange} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">onValueChange</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{setTimeRange}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectTrigger</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"hidden w-[160px] rounded-lg sm:ml-auto sm:flex"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            aria-label</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Select a value"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectValue</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> placeholder</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Last 3 months"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectTrigger</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"rounded-xl"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"90d"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"rounded-lg"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              Last 3 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"30d"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"rounded-lg"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              Last 30 days</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> value</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"7d"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"rounded-lg"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              Last 7 days</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectItem</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">SelectContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Select</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"px-2 pt-4 sm:px-6 sm:pt-6"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"aspect-auto h-[250px] w-full"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">AreaChart</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{filteredData}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">defs</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">linearGradient</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> id</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"fillDesktop"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> x1</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> y1</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> x2</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> y2</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"1"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">stop</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  offset</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"5%"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopColor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-desktop)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopOpacity</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0.8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">stop</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  offset</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"95%"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopColor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-desktop)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopOpacity</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0.1</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">linearGradient</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">linearGradient</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> id</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"fillMobile"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> x1</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> y1</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> x2</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"0"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> y2</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"1"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">stop</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  offset</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"5%"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopColor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-mobile)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopOpacity</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0.8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">stop</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  offset</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"95%"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopColor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-mobile)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  stopOpacity</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0.1</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">linearGradient</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">defs</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CartesianGrid</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> vertical</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">XAxis</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"date"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              axisLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickMargin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              minTickGap</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">32</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> date</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> date.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              cursor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  labelFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                    return</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value).</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                    })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  }}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  indicator</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"dot"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Area</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mobile"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              type</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"natural"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"url(#fillMobile)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stroke</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-mobile)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stackId</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"a"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Area</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              type</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"natural"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"url(#fillDesktop)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stroke</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-desktop)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stackId</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"a"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartLegend</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartLegendContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> />} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">AreaChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Area"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-area-interactive",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30 md:col-span-2 lg:col-span-3","children":[["$","$Lc6",null,{"chart":{"name":"chart-area-interactive","title":"undefined","description":"","registryDependencies":["card","chart","select"],"files":[{"path":"chart-area-interactive.tsx","content":"$c7","type":"registry:component","target":"components/chart-area-interactive.tsx"}],"meta":"$undefined","categories":["charts","charts-area"],"type":"registry:block","highlightedCode":"$c8","fullWidth":true},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Bar Charts

Fuente: https://ui.shadcn.com/charts/bar


### Código completo 1

```tsx
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
c8:T12963,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> *</span><span style="color:#D73A49;--shiki-dark:#F97583"> as</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { Bar, BarChart, CartesianGrid, XAxis } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "An interactive bar chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">222</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">97</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">167</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">242</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">260</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">373</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">301</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">245</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">409</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">59</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">110</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">261</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">327</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">292</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">342</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">360</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">364</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">243</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">89</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">224</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">387</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">215</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">75</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">383</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">122</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">454</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">165</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">247</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">481</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">390</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">498</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">388</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">300</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">227</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">330</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">335</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">473</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">338</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">499</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">235</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">177</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">82</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">252</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">201</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">213</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">460</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">233</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">78</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">280</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-31"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">470</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">439</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">88</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">323</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">370</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">438</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">155</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">92</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">492</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">426</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">307</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">371</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">475</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">107</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">341</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">408</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">450</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">169</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">317</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">530</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">132</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">141</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">434</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  views: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Page Views"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  desktop: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  mobile: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Mobile"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartBarInteractive</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="color:#005CC5;--shiki-dark:#79B8FF">activeChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">setActiveChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    React.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">useState</span><span style="color:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="color:#D73A49;--shiki-dark:#F97583">keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chartConfig>(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> total</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">useMemo</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    () </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ({</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      desktop: chartData.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">reduce</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">acc</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#E36209;--shiki-dark:#FFAB70">curr</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> acc </span><span style="color:#D73A49;--shiki-dark:#F97583">+</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> curr.desktop, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      mobile: chartData.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">reduce</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">acc</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#E36209;--shiki-dark:#FFAB70">curr</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> acc </span><span style="color:#D73A49;--shiki-dark:#F97583">+</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> curr.mobile, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    }),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    []</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"py-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-col items-stretch border-b p-0! sm:flex-row"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Bar Chart - Interactive&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            Showing total visitors for the last 3 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          {[</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mobile"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">].</span><span style="color:#6F42C1;--shiki-dark:#B392F0">map</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">key</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">            const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chart</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> key </span><span style="color:#D73A49;--shiki-dark:#F97583">as</span><span style="color:#D73A49;--shiki-dark:#F97583"> keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chartConfig</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">            return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">button</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                key</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chart}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                data-active</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{activeChart </span><span style="color:#D73A49;--shiki-dark:#F97583">===</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chart}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                onClick</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#6F42C1;--shiki-dark:#B392F0"> setActiveChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(chart)}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"text-xs text-muted-foreground"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  {chartConfig[chart].label}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"text-lg leading-none font-bold sm:text-3xl"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  {total[key </span><span style="color:#D73A49;--shiki-dark:#F97583">as</span><span style="color:#D73A49;--shiki-dark:#F97583"> keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> total].</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">button</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          })}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"px-2 sm:p-6"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"aspect-auto h-[250px] w-full"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">BarChart</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            accessibilityLayer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            margin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{{</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              left: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">12</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              right: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">12</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CartesianGrid</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> vertical</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">XAxis</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"date"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              axisLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickMargin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              minTickGap</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">32</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> date</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> date.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"w-[150px]"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  nameKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"views"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  labelFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                    return</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value).</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      year: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                    })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Bar</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{activeChart} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#032F62;--shiki-dark:#9ECBFF">`var(--color-${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">activeChart</span><span style="color:#032F62;--shiki-dark:#9ECBFF">})`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">BarChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Bar"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-bar-interactive",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30 md:col-span-2 lg:col-span-3","children":[["$","$Lc6",null,{"chart":{"name":"chart-bar-interactive","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-bar-interactive.tsx","content":"$c7","type":"registry:block","target":"components/chart-bar-interactive.tsx"}],"meta":"$undefined","categories":["charts","charts-bar"],"type":"registry:block","highlightedCode":"$c8","fullWidth":true},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Line Charts

Fuente: https://ui.shadcn.com/charts/line


### Código completo 1

```tsx
"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
c8:T12dd9,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> *</span><span style="color:#D73A49;--shiki-dark:#F97583"> as</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { CartesianGrid, Line, LineChart, XAxis } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "An interactive line chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">222</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">97</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">167</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">242</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">260</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">373</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">301</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">245</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">409</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">59</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">110</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">261</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">327</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">292</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">342</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">360</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">364</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">243</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">89</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">137</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">224</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">138</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">387</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">215</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">75</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">383</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">122</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-04-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">454</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">165</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">247</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">481</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">390</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">498</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">388</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">300</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">227</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">293</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">330</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">335</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">240</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">197</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">473</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">338</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">499</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">315</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">235</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">177</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">82</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">252</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">220</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">201</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">213</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">460</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">233</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">78</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">340</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">280</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-05-31"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">230</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-01"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">178</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-02"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">470</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">410</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-03"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-04"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">439</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-05"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">88</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-06"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">294</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">250</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-07"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">323</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">370</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-08"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">385</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">320</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-09"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">438</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-10"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">155</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-11"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">92</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">150</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-12"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">492</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-13"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">81</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">130</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-14"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">426</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">307</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">371</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">310</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">475</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">107</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">170</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">341</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">290</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">408</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">450</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-21"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">169</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">210</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-22"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">317</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">270</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-23"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">530</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-24"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">132</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">180</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-25"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">141</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">190</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-26"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">434</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-27"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">448</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">490</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-28"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">149</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-29"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">103</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">160</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-06-30"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">446</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, mobile: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  views: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Page Views"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  desktop: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  mobile: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Mobile"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartLineInteractive</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="color:#005CC5;--shiki-dark:#79B8FF">activeChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">setActiveChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">] </span><span style="color:#D73A49;--shiki-dark:#F97583">=</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    React.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">useState</span><span style="color:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="color:#D73A49;--shiki-dark:#F97583">keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chartConfig>(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> total</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> React.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">useMemo</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    () </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ({</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      desktop: chartData.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">reduce</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">acc</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#E36209;--shiki-dark:#FFAB70">curr</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> acc </span><span style="color:#D73A49;--shiki-dark:#F97583">+</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> curr.desktop, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      mobile: chartData.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">reduce</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">acc</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#E36209;--shiki-dark:#FFAB70">curr</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> acc </span><span style="color:#D73A49;--shiki-dark:#F97583">+</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> curr.mobile, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    }),</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    []</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"py-4 sm:py-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-col items-stretch border-b p-0! sm:flex-row"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Line Chart - Interactive&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            Showing total visitors for the last 3 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          {[</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mobile"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">].</span><span style="color:#6F42C1;--shiki-dark:#B392F0">map</span><span style="color:#24292E;--shiki-dark:#E1E4E8">((</span><span style="color:#E36209;--shiki-dark:#FFAB70">key</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">            const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chart</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> key </span><span style="color:#D73A49;--shiki-dark:#F97583">as</span><span style="color:#D73A49;--shiki-dark:#F97583"> keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chartConfig</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">            return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">button</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                key</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chart}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                data-active</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{activeChart </span><span style="color:#D73A49;--shiki-dark:#F97583">===</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> chart}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                onClick</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{() </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#6F42C1;--shiki-dark:#B392F0"> setActiveChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(chart)}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"text-xs text-muted-foreground"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  {chartConfig[chart].label}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"text-lg leading-none font-bold sm:text-3xl"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  {total[key </span><span style="color:#D73A49;--shiki-dark:#F97583">as</span><span style="color:#D73A49;--shiki-dark:#F97583"> keyof</span><span style="color:#D73A49;--shiki-dark:#F97583"> typeof</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> total].</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">()}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">span</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">button</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          })}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"px-2 sm:p-6"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"aspect-auto h-[250px] w-full"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">LineChart</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            accessibilityLayer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">            margin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{{</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              left: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">12</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              right: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">12</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CartesianGrid</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> vertical</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">XAxis</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"date"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              axisLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickMargin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              minTickGap</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">32</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> date</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value)</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> date.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"w-[150px]"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  nameKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"views"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">                  labelFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                    return</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value).</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      day: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                      year: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"numeric"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                    })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Line</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{activeChart}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              type</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"monotone"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stroke</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#032F62;--shiki-dark:#9ECBFF">`var(--color-${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">activeChart</span><span style="color:#032F62;--shiki-dark:#9ECBFF">})`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              strokeWidth</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">2</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dot</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">LineChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Line"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-line-interactive",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30 md:col-span-2 lg:col-span-3","children":[["$","$Lc6",null,{"chart":{"name":"chart-line-interactive","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-line-interactive.tsx","content":"$c7","type":"registry:block","target":"components/chart-line-interactive.tsx"}],"meta":"$undefined","categories":["charts","charts-line"],"type":"registry:block","highlightedCode":"$c8","fullWidth":true},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Pie Charts

Fuente: https://ui.shadcn.com/charts/pie


### Código completo 1

```tsx
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A simple pie chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
c8:T4f16,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { TrendingUp } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "lucide-react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { Pie, PieChart } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardFooter,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "A simple pie chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"chrome"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">275</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-chrome)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"safari"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-safari)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"firefox"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">187</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-firefox)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"edge"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">173</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-edge)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"other"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">90</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-other)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  visitors: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Visitors"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  chrome: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Chrome"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  safari: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Safari"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  firefox: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Firefox"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-3)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  edge: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Edge"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-4)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  other: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Other"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-5)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartPieSimple</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-col"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"items-center pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Pie Chart&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>January - June 2024&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex-1 pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mx-auto aspect-square max-h-[250px]"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">PieChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              cursor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> hideLabel</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> />}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Pie</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"visitors"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> nameKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"browser"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">PieChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex-col gap-2 text-sm"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex items-center gap-2 leading-none font-medium"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Trending up by 5.2% this month &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">TrendingUp</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"h-4 w-4"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"leading-none text-muted-foreground"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Showing total visitors for the last 6 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Pie"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-pie-simple",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30","children":[["$","$Lc6",null,{"chart":{"name":"chart-pie-simple","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-pie-simple.tsx","content":"$c7","type":"registry:block","target":"components/chart-pie-simple.tsx"}],"meta":"$undefined","categories":["charts","charts-pie"],"type":"registry:block","highlightedCode":"$c8","fullWidth":"$undefined"},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Radar Charts

Fuente: https://ui.shadcn.com/charts/radar


### Código completo 1

```tsx
"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadarDefault() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
c8:T4513,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { TrendingUp } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "lucide-react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { PolarAngleAxis, PolarGrid, Radar, RadarChart } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardFooter,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "A radar chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"January"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">186</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"February"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">305</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"March"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">237</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"April"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">273</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"May"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">209</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { month: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"June"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, desktop: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">214</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  desktop: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Desktop"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartRadarDefault</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"items-center pb-4"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Radar Chart&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Showing total visitors for the last 6 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mx-auto aspect-square max-h-[250px]"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">RadarChart</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> cursor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> />} /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">PolarAngleAxis</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"month"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">PolarGrid</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Radar</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"desktop"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-desktop)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fillOpacity</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0.6</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">RadarChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex-col gap-2 text-sm"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex items-center gap-2 leading-none font-medium"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Trending up by 5.2% this month &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">TrendingUp</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"h-4 w-4"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex items-center gap-2 leading-none text-muted-foreground"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          January - June 2024</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Radar"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-radar-default",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30","children":[["$","$Lc6",null,{"chart":{"name":"chart-radar-default","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-radar-default.tsx","content":"$c7","type":"registry:block","target":"components/chart-radar-default.tsx"}],"meta":"$undefined","categories":["charts","charts-radar"],"type":"registry:block","highlightedCode":"$c8","fullWidth":"$undefined"},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Radial Charts

Fuente: https://ui.shadcn.com/charts/radial


### Código completo 1

```tsx
"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartRadialSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
c8:T5194,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { TrendingUp } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "lucide-react"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { RadialBar, RadialBarChart } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardFooter,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "A radial chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"chrome"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">275</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-chrome)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"safari"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">200</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-safari)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"firefox"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">187</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-firefox)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"edge"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">173</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-edge)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { browser: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"other"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, visitors: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">90</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, fill: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-other)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  visitors: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Visitors"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  chrome: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Chrome"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  safari: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Safari"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  firefox: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Firefox"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-3)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  edge: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Edge"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-4)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  other: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Other"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-5)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartRadialSimple</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex flex-col"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"items-center pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Radial Chart&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>January - June 2024&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex-1 pb-0"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">          className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mx-auto aspect-square max-h-[250px]"</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        ></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">RadialBarChart</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">innerRadius</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">30</span><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#6F42C1;--shiki-dark:#B392F0">outerRadius</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">110</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              cursor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> hideLabel</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> nameKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"browser"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> />}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">RadialBar</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"visitors"</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> background</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">RadialBarChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex-col gap-2 text-sm"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"flex items-center gap-2 leading-none font-medium"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Trending up by 5.2% this month &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">TrendingUp</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"h-4 w-4"</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> className</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"leading-none text-muted-foreground"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Showing total visitors for the last 6 months</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#22863A;--shiki-dark:#85E89D">div</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardFooter</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Radial"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-radial-simple",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30","children":[["$","$Lc6",null,{"chart":{"name":"chart-radial-simple","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-radial-simple.tsx","content":"$c7","type":"registry:block","target":"components/chart-radial-simple.tsx"}],"meta":"$undefined","categories":["charts","charts-radial"],"type":"registry:block","highlightedCode":"$c8","fullWidth":"$undefined"},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```

## Tooltips

Fuente: https://ui.shadcn.com/charts/tooltip


### Código completo 1

```tsx
"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"
export const iframeHeight = "600px"
export const containerClassName =
  "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh"

const chartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)",
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartTooltipDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Default</CardTitle>
        <CardDescription>
          Default tooltip with ChartTooltipContent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="running"
              stackId="a"
              fill="var(--color-running)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="swimming"
              stackId="a"
              fill="var(--color-swimming)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
c8:T53c8,<pre class="no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code data-line-numbers=""><span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">"use client"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { Bar, BarChart, XAxis } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "recharts"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  Card,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardContent,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardDescription,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardHeader,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  CardTitle,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/card"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartContainer,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltip,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  ChartTooltipContent,</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  type</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> ChartConfig,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "@/components/ui/chart"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> description</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "A stacked bar chart with a legend"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> iframeHeight</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "600px"</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> containerClassName</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span></span>
<span class="line" data-line=""><span style="color:#032F62;--shiki-dark:#9ECBFF">  "[&#x26;>div]:w-full [&#x26;>div]:max-w-md flex items-center justify-center min-h-svh"</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartData</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-15"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">450</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">300</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-16"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">380</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">420</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-17"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">520</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">120</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-18"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">140</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">550</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-19"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">600</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">350</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  { date: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"2024-07-20"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, running: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">480</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, swimming: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">400</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> chartConfig</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  running: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Running"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-1)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  swimming: {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Swimming"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    color: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--chart-2)"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">} </span><span style="color:#D73A49;--shiki-dark:#F97583">satisfies</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartConfig</span></span>
<span class="line" data-line=""></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ChartTooltipDefault</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> (</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">>Tooltip - Default&#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardTitle</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          Default tooltip with ChartTooltipContent.</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardDescription</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardHeader</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> config</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartConfig}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">BarChart</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> accessibilityLayer</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> data</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{chartData}></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">XAxis</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"date"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickMargin</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">10</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              axisLine</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              tickFormatter</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{(</span><span style="color:#E36209;--shiki-dark:#FFAB70">value</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) </span><span style="color:#D73A49;--shiki-dark:#F97583">=></span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line" data-line=""><span style="color:#D73A49;--shiki-dark:#F97583">                return</span><span style="color:#D73A49;--shiki-dark:#F97583"> new</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Date</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(value).</span><span style="color:#6F42C1;--shiki-dark:#B392F0">toLocaleDateString</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"en-US"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                  weekday: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"short"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">                })</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">              }}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Bar</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"running"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stackId</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"a"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-running)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              radius</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{[</span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">4</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">4</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Bar</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              dataKey</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"swimming"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              stackId</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"a"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              fill</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#032F62;--shiki-dark:#9ECBFF">"var(--color-swimming)"</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              radius</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{[</span><span style="color:#005CC5;--shiki-dark:#79B8FF">4</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">4</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">, </span><span style="color:#005CC5;--shiki-dark:#79B8FF">0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">]}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltip</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              content</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{&#x3C;</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartTooltipContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> />}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              cursor</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">false</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#6F42C1;--shiki-dark:#B392F0">              defaultIndex</span><span style="color:#D73A49;--shiki-dark:#F97583">=</span><span style="color:#24292E;--shiki-dark:#E1E4E8">{</span><span style="color:#005CC5;--shiki-dark:#79B8FF">1</span><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">            /></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">BarChart</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">ChartContainer</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">CardContent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="color:#005CC5;--shiki-dark:#79B8FF">Card</span><span style="color:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">  )</span></span>
<span class="line" data-line=""><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line" data-line=""></span></code></pre>88:["$","div",null,{"className":"grid flex-1 gap-12 lg:gap-24","children":[["$","h2",null,{"className":"sr-only","children":["Tooltip"," Charts"]}],["$","div",null,{"className":"grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10","children":[["$","div","chart-tooltip-default",{"className":"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30","children":[["$","$Lc6",null,{"chart":{"name":"chart-tooltip-default","title":"undefined","description":"","registryDependencies":["card","chart"],"files":[{"path":"chart-tooltip-default.tsx","content":"$c7","type":"registry:block","target":"components/chart-tooltip-default.tsx"}],"meta":"$undefined","categories":["charts","charts-tooltip"],"type":"registry:block","highlightedCode":"$c8","fullWidth":"$undefined"},"className":"relative z-20 flex justify-end px-3 py-2.5"}],"$Lc9"]}],"$Lca","$Lcb","$Lcc","$Lcd","$Lce","$Lcf","$Ld0","$Ld1","$Ld2","$Ld3","$Ld4"]}]]}]
"])
```
