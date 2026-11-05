import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MeridianMotionButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

export function MeridianMotionButton({
  className,
  variant = "default",
  size = "default",
  children,
  disabled,
  ...props
}: MeridianMotionButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      data-slot="meridian-motion-button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      whileHover={disabled || reduceMotion ? undefined : { y: -1 }}
      whileTap={disabled || reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.55 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
