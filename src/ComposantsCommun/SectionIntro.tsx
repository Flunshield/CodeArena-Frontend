import clsx from 'clsx'

import { Container } from './Container'
import { FadeIn } from './FadeIn'

export function SectionIntro({
    title,
    eyebrow,
    children,
    smaller = false,
    invert = false,
    ...props

}: Omit<
    React.ComponentPropsWithoutRef<typeof Container>,
    'title' | 'children'
> & {
    title: string
    eyebrow?: string
    children?: React.ReactNode
    smaller?: boolean
    invert?: boolean
}) {
    return (
        <Container {...props}>
            <FadeIn >
            <h2>
                    {eyebrow && (
                        <>
                            <span
                                className={clsx(
                                    'mb-6 block font-display text-base font-semibold',
                                    invert ? 'text-tertiari' : 'text-neutral-950',
                                )}
                            >
                                {eyebrow}
                            </span>
                            <span className="sr-only"> - </span>
                        </>
                    )}
                    <span
                        className={clsx(
                            'block font-display tracking-tight [text-wrap:balance]',
                            smaller
                                ? 'text-2xl font-semibold'
                                : 'text-2xl font-medium sm:text-3xl',
                            invert ? 'text-tertiari' : 'text-neutral-950',
                        )}
                    >
                        {title}
                    </span>
                </h2>
                {children && (
                    <div
                        className={clsx(
                            'mt-6 text-xl',
                            invert ? 'text-neutral-300' : 'text-neutral-600',
                        )}
                    >
                        {children}
                    </div>
                )}
            </FadeIn>
        </Container>
    )
}


