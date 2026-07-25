const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const APPS = require('../data/apps.data.js')

// express 首页
router.get('/', (req, res) => {
	const indexPath = path.join(__dirname, '../views', 'index.html')
	fs.readFile(indexPath, 'utf8', (err, content) => {
		if (err) {
			res.status(500).send('无法读取首页')
			return
		}
		// 生成标签 HTML（从 type 属性提取唯一值）
		const uniqueTypes = ['全部', ...new Set(APPS.map(item => item.type))]
		const tagsHtml = uniqueTypes
			.map(
				type =>
					`<div class="tag${type === '全部' ? ' active' : ''}" data-type="${type}">${type === '全部' ? type : type.toUpperCase()}</div>`
			)
			.join('\n')

		// 生成项目链接 HTML
		const appsLinks = APPS.map(item => {
			return `<a href="${item.path}" class="card" data-type="${item.type}" target="_blank">
					<div class="card-img">
						<img src="${item.banner}" alt="${item.name}">
						<div class="mask"></div>
					</div>
					<div class="card-body">
						<div class="card-title">${item.name}</div>
						<p class="card-desc">${item.description}</p>
					</div>
				</a>`
		}).join('\n')
		// 替换模板变量
		const html = content.replace('{{tags}}', tagsHtml).replace('{{apps}}', appsLinks)
		res.send(html)
	})
})

module.exports = router
