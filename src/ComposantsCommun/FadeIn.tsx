'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

interface FadeInProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  duration?: number
}


export function FadeIn({ duration = 0.5, ...props }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration }}
      {...(isInStaggerGroup
        ? {}
        : {
          initial: 'hidden',
          whileInView: 'visible',
          viewport,
        })}
      {...props}
    />
  )
}

interface FadeInStaggerProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  faster?: boolean;
  staggerDuration?: number;
}
export function FadeInStagger({
  faster = false,
  staggerDuration = 0.2,
  ...props
}: FadeInStaggerProps) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{staggerChildren: faster ? staggerDuration * 0.6 : staggerDuration }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
