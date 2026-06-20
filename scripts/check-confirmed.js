import { readFileSync } from 'fs'

const src = readFileSync('./src/data/clubs.js', 'utf8')
if (src.includes('confirm: true')) {
  console.error('\nBUILD BLOCKED: unverified source cards (confirm: true) found in src/data/clubs.js')
  console.error('Verify all claims and set confirm: false before building for production.\n')
  process.exit(1)
}
