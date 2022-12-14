const { it, interfaces } = require('mocha')
const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const context = await browser.createIncognitoBrowserContext() // for incongnito browser context
		page = await context.newPage() // opens new page on the incognito context
		//page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Desktop Device Test', async function () {
		await page.setViewport({ width: 1650, height: 1050 }) // simulates the desire resolution
		await page.goto('https://example.com')
		await page.waitForTimeout(5000)
	})
	it('Tablet Device Test', async function () {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('https://example.com')
		await page.waitForTimeout(5000)
	})
	it('Mobile Device Test', async function () {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
		await page.goto('https://example.com')
		await page.waitForTimeout(5000)
	})
})
