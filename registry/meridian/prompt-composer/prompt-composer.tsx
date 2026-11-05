import * as React from "react"
import { ArrowUp, Globe2, Paperclip, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type PromptComposerProps = {
  onSubmit?: (value: string) => void
  placeholder?: string
}

export function PromptComposer({
  onSubmit,
  placeholder = "Ask Meridian anything…",
}: PromptComposerProps) {
  const [value, setValue] = React.useState("")

  const submit = () => {
    const prompt = value.trim()
    if (!prompt) return
    onSubmit?.(prompt)
    setValue("")
  }

  return (
    <TooltipProvider>
      <div className="rounded-2xl border bg-background p-2 shadow-sm">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              submit()
            }
          }}
          placeholder={placeholder}
          aria-label="Prompt"
          className="min-h-24 resize-none border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant="outline" aria-label="Add attachment">
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add attachment</TooltipContent>
            </Tooltip>
            <Button type="button" variant="outline" size="sm">
              <Globe2 /> Search
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant="ghost" aria-label="Upload file">
                  <Paperclip />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Upload file</TooltipContent>
            </Tooltip>
          </div>
          <Button
            type="button"
            size="icon"
            onClick={submit}
            disabled={!value.trim()}
            aria-label="Send prompt"
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
