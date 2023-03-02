import { FetchRawHtml } from './fetch.js'
import { JSDOM } from 'jsdom';
import { parse } from 'node-html-parser';

(async () => {
    const res = await FetchRawHtml('130334269')
    const document = new JSDOM(res).window.document
    // const document = parse(res)

    let selector = '#ctl00_cphMain_dvDatosContribuyentes tbody tr';
    // let obj = {}
    // Array.from(document.querySelectorAll(selector)).forEach(m => 
    //     obj[`${m.childNodes[1].textContent}`]=m.childNodes[2].textContent
    // )
    // console.log(obj)

    let rnc = Array.from(document.querySelectorAll(selector)).reduce((acum,curr) => 
        Object.assign(acum,{
            [`${curr.childNodes[1].textContent}`]:curr.childNodes[2].textContent
        })
    ,{})
    console.log(rnc)

})();