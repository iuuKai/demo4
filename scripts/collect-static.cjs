const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dest = path.join(root, '_site')

const copyDir = (src, dst) => {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dst, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dst, entry.name)
    if (entry.isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

const apps = [
  { name: 'astro-ssg', from: 'dist' },
  { name: 'hexo-ssg', from: 'public' },
  { name: 'next-ssg', from: 'out' },
  { name: 'nuxt4-ssg', from: '.output/public' },
  { name: 'react-spa', from: 'dist' },
  { name: 'vanilla-spa', from: '.' },
  { name: 'vitepress-ssg', from: 'docs/.vitepress/dist' },
  { name: 'vue3-spa', from: 'dist' },
  { name: 'vuepress-ssg', from: 'docs/.vuepress/dist' },
  { name: 'webpack-ejs-mpa', from: 'dist' },
  { name: 'express-api', from: 'public' },
]

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true })
}

for (const app of apps) {
  const srcDir = path.join(root, 'apps', app.name, app.from)
  const dstDir = path.join(dest, 'apps', app.name, app.from)
  console.log(`  → copying ${app.name}/${app.from}`)
  copyDir(srcDir, dstDir)
}

console.log('Done. Static output in _site/')
