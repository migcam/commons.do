import puppeteer from 'puppeteer';

(async () => {
    const rnc_input_id = '#ctl00_cphMain_txtRNCCedula'
    const rnc = '130334269'
    const url = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx'
    const button_Id = '#ctl00_cphMain_btnBuscarPorRNC'
    const companySelector = '#ctl00_cphMain_dvDatosContribuyentes > tbody > tr:nth-child(3) > td:nth-child(2)'

    const browser = await puppeteer.launch(
        // {
        //     headless: false,
        //     slowMo: 250
        // }
        );

    const page = await browser.newPage();
    await page.goto(url);
    await page.type(rnc_input_id,rnc)
    await page.click(button_Id)
    
    await page.waitForSelector(companySelector)
    let element = await page.$(companySelector)
    let value = await page.evaluate(el => el.textContent, element)
    console.log(value)

    browser.close()

    console.log('browser closed')
})();