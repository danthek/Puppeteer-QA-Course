const puppeteer = require('puppeteer')

//"describe" is a wrapper for out test suite/steps
describe('HTML Injection', () => {
	it('Should inject an HTML script', async function () {
		const browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			devtools: true,
		})
		const page = await browser.newPage()
		await page.goto('http://localhost:3000/login')
		const client = await page.target().createCDPSession()
		await page.waitForTimeout(3000)
		await client.send('Runtime.evaluate', {
			includeCommandLineAPI: true,
			expression: `
      var s = document.createElement( 'iframe' );
      s.setAttribute( 'src', "https://www.playstation.com/" );
      s.setAttribute( 'style', "height:500px;width:500px;top:0" );
      document.querySelector('body').appendChild( s );
      `,
		})

		await page.close()
		await browser.close()
	})
})

/* module.exports = async function (browser) {


  const client = await page.target().createCDPSession();



  await page.close();

  return { html: 'worked' };
};

 */
