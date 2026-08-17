/**
 * verify-no-placeholders.mjs
 *
 * Scans rendered-source seeds and public copy files for legacy branding,
 * obsolete addresses, placeholder copy, sample pricing, and sample dates.
 * Occurrences inside docs/ (verification documentation) and migrations are
 * intentionally allowed — this scanner targets what would reach visitors.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const ROOT = resolve(process.cwd())
const SCAN_DIRS = ['src', 'public']
const IGNORED_DIRS = new Set(['node_modules', '.next', '.git', '.tools', 'migrations'])

const PATTERNS = [
  { label: 'lorem ipsum', re: /lorem ipsum/i },
  { label: 'placeholder', re: /\bplaceholder\b/i },
  { label: 'Mahreen branding', re: /\bmahreen\b/i },
  { label: 'obsolete Hillside address', re: /169-26 hillside/i },
  { label: 'embed live map placeholder', re: /embed live map here/i },
  { label: 'sample price', re: /only\s*\$199/i },
  { label: 'sample defensive-driving date', re: /aug\s*22,\s*2026/i },
  { label: 'sample defensive-driving price', re: /\$49\b/i },
]

function walk(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (!IGNORED_DIRS.has(entry)) results.push(...walk(full))
    } else if (/\.(ts|tsx|js|mjs|css|json|html)$/.test(entry)) {
      results.push(full)
    }
  }
  return results
}

function main() {
  const matches = []
  for (const scanDir of SCAN_DIRS) {
    const fullDir = join(ROOT, scanDir)
    if (!existsSync(fullDir) || !statSync(fullDir).isDirectory()) continue
    for (const file of walk(fullDir)) {
      const content = readFileSync(file, 'utf8')
      for (const { label, re } of PATTERNS) {
        if (re.test(content)) {
          matches.push(`${label} in ${relative(ROOT, file)}`)
        }
      }
    }
  }

  if (matches.length > 0) {
    console.error('Placeholder/legacy content found:')
    for (const match of matches) console.error(`  - ${match}`)
    process.exit(1)
  }
  console.log('No placeholder or legacy content found in rendered source.')
}

main()
