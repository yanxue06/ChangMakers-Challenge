import { copyFileSync, readFileSync, writeFileSync } from 'fs'

// Copy backend files to dist
copyFileSync('backend/content.js', 'dist/content.js')
copyFileSync('backend/background.js', 'dist/background.js')
copyFileSync('backend/popup.js', 'dist/popup.js')
copyFileSync('manifest.json', 'dist/manifest.json')

// Copy and modify index.html for production
const template = readFileSync('scripts/index.template.html', 'utf-8')
writeFileSync('dist/index.html', template) 