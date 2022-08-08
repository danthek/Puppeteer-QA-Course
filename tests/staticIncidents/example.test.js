const puppeteer = require('puppeteer')

//"describe" is a wrapper for out test suite/steps
describe('My first puppeteer test', () => {
  it('should launch the browser', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    })
    const page = await browser.newPage()
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.type('#developer-name', 'Abraham', {delay:0})
    await page.click('#tried-test-cafe', {clickCount: 1})
    await page.waitForTimeout(3000) 
    await page.select('#preferred-interface', 'JavaScript API')
    await page.waitForTimeout(3000) 
    await page.close();
    await browser.close();
  })
})


/*  await page.reload() // reloads the browser
    await page.waitForTimeout(3000) //Pause puppeter before it pass to the next action
    await page.waitForSelector('h1') // if it doesnt find an h1 elemnt it will trhow an error, otherwise it will pass
    await page.goBack()// to previous tab
    await page.goForward()
    await page.type('#developer-name', 'Abraham', {delay:200}) // type values on inputs , the first parameter is the id/class of the element
    await page.click('#tried-test-cafe', {clickCount: 2}) // clickcount is for the number of clicks on the elemnent
    await page.select('#preferred-interface', 'JavaScript API')// to select items from dropdowns



    */