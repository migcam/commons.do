import { FetchRawHtml } from './fetch.js'
import { parse } from 'node-html-parser';

(async () => {
    const res = await FetchRawHtml('130334269')
    const document = parse(res)

    let selector = 'tr';

    let rnc = Array.from(document.querySelectorAll(selector)).reduce((acum,curr) => 
        Object.assign(acum,{
            [`${curr.childNodes[1].textContent}`]:curr.childNodes[2].textContent
        })
    ,{})
    console.log(rnc)

})();