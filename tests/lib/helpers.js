module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error(`Could not click on selector of value: ${selector}`)
		}
	},
	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, (element) => element.innerHTML)
		} catch (error) {
			throw new Error(`Cannot get text from selector: ${selector}`)
		}
	},
	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$$eval(selector, (elements) => elements.length)
		} catch (error) {
			throw new Error(`Cannot get count of selector: ${selector}`)
		}
	},
	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (error) {
			throw new Error(`Could not be able to type into selector: ${selector}`)
		}
	},
	waitForText: async function (page, selector, text) {
		// searchs on the whole DOM if there is a match between a selector and a text on it
		//without puppeter's $eval innerText &  chai's  "to.include" and expect)
		try {
			await page.waitForSelector(selector)
			/* 	const value = await page.$eval(selector, (element) => element.textContent)
			expect(value).to.include(text) */
			return await page.waitForFunction((selector, text) => {
				document.querySelector(selector).innerText.includes(text),
					{},
					selector,
					text
			}) // we need an empty state as 2nd parameter  to actually be able to pass the value  to the browser (this is how node  & the browser communicate with each other)
		} catch (error) {
			throw new Error(`Text: ${text} not found in Selector: ${selector}`)
		}
	},
	shouldNotExist: async function (page, selector) {
		try {
			// This one fails if the webpage is just hidding the element: await page.waitForSelector(() => !document.querySelector(selector))
			await page.waitForSelector(selector, {
				hidden: true,
				timeout: 3000,
			})
		} catch (error) {
			throw new Error(`Selector: ${selector} is visible, but should not be.`)
		}
	},
}
