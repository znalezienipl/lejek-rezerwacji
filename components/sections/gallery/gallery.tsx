import Image from "next/image"
import type { BrandConfig, GalleryItem } from "@/lib/site-config"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/system/primitives"
import { Reveal } from "@/components/system/reveal"
import { cn } from "@/lib/utils"

export function Gallery({ config }: { config: BrandConfig }) {
  const { gallery, theme } = config
  const rounded = theme === "wellness" ? "24px" : theme === "glamour" ? "2px" : "0px"
  const centered = theme === "wellness"

  return (
    <Section id="gallery" theme={theme}>
      <Container size="wide">
        <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
          <Reveal>
            <div className={cn(centered && "flex justify-center")}>
              <Eyebrow>{gallery.eyebrow}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              className={cn(
                "mt-6 text-4xl sm:text-5xl",
                theme === "glamour" && "font-bold uppercase tracking-tight",
              )}
            >
              {gallery.title}
            </SectionHeading>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">{gallery.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[280px] md:grid-cols-4 md:gap-5">
          {gallery.items.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className={cn(
                spanClass(item),
                "min-h-0",
              )}
            >
              <GalleryTile item={item} rounded={rounded} glamour={theme === "glamour"} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function spanClass(item: GalleryItem) {
  if (item.span === "tall") return "row-span-2 md:col-span-2 md:row-span-2"
  if (item.span === "wide") return "col-span-2 md:col-span-2"
  return "col-span-1 md:col-span-1 md:row-span-1"
}

function GalleryTile({
  item,
  rounded,
  glamour,
}: {
  item: GalleryItem
  rounded: string
  glamour: boolean
}) {
  return (
    <figure
      className="group relative h-full w-full overflow-hidden"
      style={{ borderRadius: rounded }}
    >
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      {glamour ? (
        <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      ) : null}
      {item.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-background/70 to-transparent p-5 font-sans text-xs uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
