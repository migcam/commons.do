import puppeteer from 'puppeteer';

(async () => {
    const rnc_input_id = '#ctl00_cphMain_txtRNCCedula'
    const rnc = '130334269'
    // const rnc = process.argv[2]
    const url = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx'
    const button_Id = '#ctl00_cphMain_btnBuscarPorRNC'
    const company_td_Selector = '#ctl00_cphMain_dvDatosContribuyentes > tbody > tr:nth-child(3) > td:nth-child(2)'

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

    await page.waitForSelector(company_td_Selector)
    
    let res = {}
    const data = await page.$$eval('#ctl00_cphMain_dvDatosContribuyentes tbody tr', trs => trs.map((tr) => {
        return {
           column:  tr.cells.item(0).innerText,
           value: tr.cells.item(1).innerText,
        }
    }));
    console.log(data);

    data.forEach(m=> res[m.column] = m.value)
    console.log(JSON.stringify(res))


    browser.close()

    console.log('browser closed')
})();