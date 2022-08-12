const puppeteer = require('puppeteer')
const { click, typeText, waitForText } = require('../lib/helpers')
const expect = require('chai').expect

describe('Feedback Test', () => {
	let browser
	let page
	before(async function () {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 0,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(10000)
	})
	after(async function () {
		await browser.close()
	})
	it('Display Feedback Form', async function () {
		await page.goto('http://zero.webappsecurity.com/')
		await click(page, '#feedback')
	})
	it('Submit Feedback Form', async function () {
		await typeText(page, '#name', 'Name')
		await typeText(page, '#email', 'test@email.com')
		await typeText(page, '#subject', 'Subject')
		await typeText(page, '#comment', 'Just a message into the text area')
		await click(page, 'input[type="submit"]')
	})
	it('Display Results Page', async function () {
		// await page.waitForSelector('#feedback-title')
		waitForText(page, '#feedback-title', 'Feedback')
		const url = await page.url()
		expect(url).to.include('sendFeedback')
	})
})
