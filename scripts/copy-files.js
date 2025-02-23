import { copyFileSync } from 'fs'

// Copy backend files to dist
copyFileSync('backend/content.js', 'dist/content.js')
copyFileSync('backend/background.js', 'dist/background.js')
copyFileSync('backend/popup.js', 'dist/popup.js')
copyFileSync('manifest.json', 'dist/manifest.json') 