import clsx from 'clsx'

import {Container} from './Container'
import {FadeIn} from './FadeIn'

export function SectionIntro({
                                 children,
                                 invert = false,
                                 ...props
                             }: Omit<
    React.ComponentPropsWithoutRef<typeof Container>,
    'title' | 'children'
> & {
    eyebrow?: string
    children?: React.ReactNode
    smaller?: boolean
    invert?: boolean
}) {
    return (
        <Container {...props}>
            <FadeIn className="">
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
