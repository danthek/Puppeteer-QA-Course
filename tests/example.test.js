const { before } = require('mocha')
const puppeteer = require('puppeteer')
const expect = require('chai').expect //used for assertions

describe('Login test', () => {
	let browser // its a good proactice to deine variables at the top
	let page
	before(async function () {
		// here we setup and prepare our test
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 30,
			devtools: false,
		})
		await browser.newPage()
		await page.setDefaultTimeout(0) // sets  the defeault time out for all awaits
		await page.setDefaultNavigationTimeout(0) // sets the defautl timeout for the navigation (go forward, back, etc)
	})
	after(async function () {
		await browser.close() // we do this so the browser closes after all the "its" had run
	})
	beforeEach(async function () {
		// the main diference vs "before" is that "before""only runs once  in the whole test" abd "before each" runs before each "it".
	})

	afterEach(async function () {
		// runs after each test step ( vs "after" which runs at the end of the whole test)
		// for example if we need to reset or prepare some state before or after each of the it steps
		// or if we have some logging implemented its a good place to use it
	})

	it('Should launch the browser', async function () {
		await page.setDefaultTimeout(0)
		await page.goto('	http://zero.webappsecurity.com/')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000,
		}) // we indicate that we search for this selector but hidden (doesnt exist)
		//nd we overide the timeout to 3 secs
		await page.waitForTimeout(3000)
	})
})

///////////////////////////browser attributes
/* args: ['--start-fullscreen'], //for full screen as browser parameter
	slowMo: 30, // slow all the actions
			devtools: true, // Launch cromium with the console opened
			*/
/*	
const page = await browser.newPage()
		await page.goto('https:example.com')
		await page.setDefaultTimeout(10000) // sets  the defeault time out for all awaits
		await page.setDefaultNavigationTimeout(20000) // sets the defautl timeout for the navigation (go forward, back, etc)

	  await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.waitForSelector('h1')
		await page.goto('https://www.nintendo.com/')
		await page.reload() // reloads the browser
		await page.goBack() // to previous tab
		await page.click('#tried-test-cafe', { clickCount: 3 }) // clickcount is for the number of clicks on the elemnent
		await page.type('#developer-name', 'Danthek' , {delay:200}) // type values on inputs , the first parameter is the id/class of the element
		await page.select('#preferred-interface', 'JavaScript API')// to select items from dropdowns
		const msg = 'This is the automated typed message by Puppeteer'
		await page.type('#comments', msg, { delay: 0 })
		await page.click('#submit-button')
		await page.waitForSelector('h1') // if it doesnt find an h1 elemnt it will trhow an error, otherwise it will pass
		await page.waitForTimeout(3000) //Pause puppeter before it pass to the next action
		await page.keyboard.press('Enter', { delay: 10 }) // we can indicate to press escape key, etc
		await browser.close()
    */

//////////////////////webpage title & URL
/* 
    const title = await page.title()
		const url = await page.url()
		console.log(`Title: ${title} URL: ${url}`)
		console.log('Title: ' + title + ' URL: ' + url)
		console.log('Title:', title, 'URL:', url)
 */
///////////////////////////////////$eval
/* 
    const text = await page.$eval('h1', (element) => element.textContent) // the eval function uses a callback function 
		//that returns the textcontent of the element which in this case is ' H1'.
		console.log(`Text in the H1: ${text}`)
		*/

/* const count = await page.$$eval('p', (element) => element.length) // with two '$$' the function returns more than one element (multiple elements)
console.log(`Number of P tags on the page: ${count}`)
 */

///////////////////////////////WAIT FOR XPATH
/* const page = await browser.newPage()
await page.setDefaultTimeout(0)

let currentURL
page
	.waitForXPath('//img') //it’a like waiting for a selector but using xml xpath relative or absoulte sintax
	.then(() => console.log('First URL with image: ' + currentURL))
for (currentURL of [
	'https://example.com',
	'https://google.com',
	'https://bbc.com',
	'	http://zero.webappsecurity.com/',
]) {
	await page.goto(currentURL)
}
 */

/*
//////////////////////////////// VALIDATE THAT AN ELEMENT NOT LONGER EXIST ON THE DOM
METHOD A: 
const page = await browser.newPage()
await page.setDefaultTimeout(0)
await page.goto('	http://zero.webappsecurity.com/')
await page.waitForSelector('#signin_button')
await page.click('#signin_button')
await page.waitForFunction(() => !document.querySelector('#signin_button')) // waits until the selector is no longer present in the DOM 

METHOD B:
await page.waitForSelector('#signin_button', {
	hidden: true,
	timeout: 3000,
}) // we indicate that we search for this selector but hidden (doesnt exist)
//nd we overide the timeout to 3 secs
*/

//////////////////////////// HOOKS
/* describe('My first puppeteer test', () => {
	let browser // its a good proactice to deine variables at the top
	let page
	before(async function () {
		// here we setup and prepare our test
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 30,
			devtools: false,
		})
		await browser.newPage()
		await page.setDefaultTimeout(0) // sets  the defeault time out for all awaits
		await page.setDefaultNavigationTimeout(0) // sets the defautl timeout for the navigation (go forward, back, etc)
	})
	after(async function () {
		await browser.close() // we do this so the browser closes after all the "its" had run
	})
	beforeEach(async function () {
		// the main diference vs "before" is that "before""only runs once  in the whole test" abd "before each" runs before each "it".
	})

	afterEach(async function () {
		// runs after each test step ( vs "after" which runs at the end of the whole test)
		// for example if we need to reset or prepare some state before or after each of the it steps
		// or if we have some logging implemented its a good place to use it
	}) */
