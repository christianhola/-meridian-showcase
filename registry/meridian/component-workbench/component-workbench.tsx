import * as React from "react"
import { Check, Code2, Copy, Eye, Palette } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ComponentWorkbenchProps = {
  title: string
  description: string
  code: string
  children: React.ReactNode
}

export function ComponentWorkbench({
  title,
  description,
  code,
  children,
}: ComponentWorkbenchProps) {
  const [copied, setCopied] = React.useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <header className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="outline">Meridian Sync</Badge>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </header>
      <Tabs defaultValue="preview">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="preview"><Eye /> Preview</TabsTrigger>
            <TabsTrigger value="code"><Code2 /> Code</TabsTrigger>
            <TabsTrigger value="tokens"><Palette /> Tokens</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="m-0 grid min-h-80 place-items-center p-8">
          {children}
        </TabsContent>
        <TabsContent value="code" className="m-0 bg-zinc-950 text-zinc-50">
          <div className="flex justify-end border-b border-white/10 p-2">
            <Button type="button" variant="ghost" size="sm" onClick={copyCode} className="text-zinc-100 hover:bg-white/10 hover:text-white">
              {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="overflow-auto p-5 text-sm leading-6"><code>{code}</code></pre>
        </TabsContent>
        <TabsContent value="tokens" className="m-0 grid gap-3 p-5 sm:grid-cols-3">
          {["background", "foreground", "primary", "border", "muted", "accent"].map((token) => (
            <div key={token} className="rounded-lg border p-3 text-sm">
              <div className="mb-3 h-12 rounded-md border bg-muted" />
              <code>--{token}</code>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  )
}
