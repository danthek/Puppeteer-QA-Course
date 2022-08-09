const puppeteer = require('puppeteer')
const expect = require('chai').expect //used for assertions

describe('My first puppeteer test', () => {
	it('Should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: true,
			slowMo: 30,
			devtools: true,
		})
		const page = await browser.newPage()
		await page.goto('https:example.com')

		const title = await page.title()
		const url = await page.url()
		const text = await page.$eval('h1', (element) => element.textContent) // the eval function uses a callback function that returns the textcontent of the element which in this case is ' H1'.
		const count = await page.$$eval('p', (element) => element.length) // with two '$$' the function returns more than one element (multiple elements)
		expect(title).to.be.a('string', 'Example Domaimmmmmn')
		expect(url).to.include('example')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)
		await browser.close()
	})
})

//for full screen as browser parameter:
/* args: ['--start-fullscreen'], */
/*	
	  await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.waitForSelector('h1')
		await page.goto('https://www.nintendo.com/')
		await page.reload()
		await page.goBack()
		await page.goForward()
		await page.waitForTimeout(1000)
		await page.goBack()
		await page.click('#tried-test-cafe', { clickCount: 3 })
		await page.type('#developer-name', 'Danthek')
		await page.select('#preferred-interface', 'Both')
		const msg = 'This is the automated typed message by Puppeteer'
		await page.type('#comments', msg, { delay: 0 })
		await page.click('#submit-button')
		await page.waitForSelector('.result-content')
		await page.waitForTimeout(3000)
		await browser.close()
    */
/* 
    const title = await page.title()
		const url = await page.url()
		console.log(`Title: ${title} URL: ${url}`)
		console.log('Title: ' + title + ' URL: ' + url)
		console.log('Title:', title, 'URL:', url)
 */
/* 
    const text = await page.$eval('h1', (element) => element.textContent) // the eval function uses a callback function that returns the textcontent of the element which in this case is ' H1'.
		console.log(`Text in the H1: ${text}`)
		*/

/* const count = await page.$$eval('p', (element) => element.length) // with two '$$' the function returns more than one element (multiple elements)
console.log(`Number of P tags on the page: ${count}`)
 */

/*  await page.reload() // reloads the browser
    await page.waitForTimeout(3000) //Pause puppeter before it pass to the next action
    await page.waitForSelector('h1') // if it doesnt find an h1 elemnt it will trhow an error, otherwise it will pass
    await page.goBack()// to previous tab
    await page.goForward()
    await page.type('#developer-name', 'Abraham', {delay:200}) // type values on inputs , the first parameter is the id/class of the element
    await page.click('#tried-test-cafe', {clickCount: 2}) // clickcount is for the number of clicks on the elemnent
    await page.select('#preferred-interface', 'JavaScript API')// to select items from dropdowns



    */
