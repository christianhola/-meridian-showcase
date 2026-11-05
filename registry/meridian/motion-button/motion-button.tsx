import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MeridianMotionButtonProps = Omit<React.ComponentProps<typeof Button>, "asChild"> & {
  variant?: Parameters<typeof buttonVariants>[0]["variant"]
  size?: Parameters<typeof buttonVariants>[0]["size"]
}

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
