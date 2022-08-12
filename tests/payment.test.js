const puppeteer = require('puppeteer')
const { typeText, click } = require('./lib/helpers')

describe('Payment Test', () => {
	let browser
	let page
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(10000)
		await page.goto('http://zero.webappsecurity.com/login.html')
		await page.waitForSelector('#login_form')
		await typeText(page, '#user_login', 'username')
		await typeText(page, '#user_password', 'password')
		await click(page, '#user_remember_me')
		await click(page, 'input[class="btn btn-primary"]')
	})
	after(async function () {
		await browser.close()
	})
	it('Display Payment Form', async function () {
		await page.waitForSelector('.nav-tabs')
		await page.click('#pay_bills_tab')
		await page.waitForSelector('.board')
	})
	it('Make Payment', async function () {
		await page.select('#sp_payee', 'Apple')
		await page.select('#sp_account', 'Credit Card')
		typeText(page, '#sp_ammouont', '500') // quantyties always must be in strings
		typeText(page, '#sp_date', '2020-03-18') // if its a date picker we type and press enter only
		await page.keyboard.press('Enter')
		typeText(page, '#sp_description', 'Payment for rent.') // if its a date picker we type and press enter only
		click(page, '#pay_saved_payees')
		await page.waitForSelector('#alert_content')
	})
})
