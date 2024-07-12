import { Border } from "./Border"
import { FadeIn } from "./FadeIn"

export function ItemList({
    children,
    title,
  }: {
    id: string,
    children: React.ReactNode
    title?: string
  }) {
    return (
      <li className="group mt-10 first:mt-0">
        <FadeIn>
          <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
            {title && (
              <strong className="font-semibold text-neutral-950">{`${title}. `}</strong>
            )}
            {children}
          </Border>
        </FadeIn>
      </li>
    )
  }