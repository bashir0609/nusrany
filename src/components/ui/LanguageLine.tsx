type LanguageLineProps = {
  languages: string[]
  dark?: boolean
}

export function LanguageLine({ languages, dark = false }: LanguageLineProps) {
  const labels = languages.filter(Boolean)
  if (labels.length === 0) return null
  return (
    <p className={`text-sm ${dark ? 'text-white/80' : 'text-muted'}`}>
      <span className={`font-semibold ${dark ? 'text-white' : 'text-ink'}`}>We speak </span>
      {labels.join(' · ')}
    </p>
  )
}
