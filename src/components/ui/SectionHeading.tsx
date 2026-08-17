type SectionHeadingProps = {
  title: string
  lead?: string
  id?: string
}

export function SectionHeading({ title, lead, id }: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-2xl">
      <h2 id={id}>{title}</h2>
      {lead ? <p className="mt-3 text-lg text-muted">{lead}</p> : null}
    </div>
  )
}
