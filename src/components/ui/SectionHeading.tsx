type SectionHeadingProps = {
  title: string
  lead?: string
  id?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ title, lead, id, as = 'h2' }: SectionHeadingProps) {
  const Heading = as
  return (
    <div className="mb-8 max-w-2xl">
      <Heading id={id}>{title}</Heading>
      {lead ? <p className="mt-3 text-lg text-muted">{lead}</p> : null}
    </div>
  )
}
