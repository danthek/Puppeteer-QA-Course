const puppeteer = require('puppeteer')
const {
	click,
	typeText,
	shouldNotExist,
	waitForText,
} = require('../lib/helpers')
const expect = require('chai').expect

describe('Login Test', () => {
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

	it('Login Test - Invalid Credentials', async function () {
		await page.goto('http://zero.webappsecurity.com/')
		await click(page, '#signin_button')
		await page.waitForSelector('#login_form')
		await typeText(page, '#user_login', 'invalid credentials')
		await typeText(page, '#user_password', 'invalid password')
		await click(page, '#user_remember_me')
		await click(page, 'input[class="btn btn-primary"]')
		await page.waitForSelector('.alert.alert-error')
	})
	it('Login Test - Valid Credentials', async function () {
		await page.goto('http://zero.webappsecurity.com/')
		await click(page, '#signin_button')
		await page.waitForSelector('#login_form')
		await typeText(page, '#user_login', 'username')
		await typeText(page, '#user_password', 'password')
		await click(page, '#user_remember_me')
		await click(page, 'input[class="btn btn-primary"]')
		await page.goBack()
		await page.waitForTimeout(3000)
		await shouldNotExist(page, 'input[class="btn btn-primary"]')
		await page.waitForSelector('#settingsBox > ul > li:nth-child(3) > a')
		waitForText(page, '#account_activity_link', 'Checking Account Activity')
		await page.waitForTimeout(3000)
	})
})
