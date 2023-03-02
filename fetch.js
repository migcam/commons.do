import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

export async function FetchRawHtml(rnc){

    const encodedParams = new URLSearchParams();

    encodedParams.set('__VIEWSTATE', '/wEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYCAgUPZBYEAgUPPCsADwEADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50ZmRkAgcPPCsADQBkGAIFH2N0bDAwJGNwaE1haW4kZ3ZCdXNjUmF6b25Tb2NpYWwPZ2QFI2N0bDAwJGNwaE1haW4kZHZEYXRvc0NvbnRyaWJ1eWVudGVzD2dkM6A6zdloNYs/efZ4JU/LIN3TDKM=');
    encodedParams.set('__EVENTVALIDATION', '/wEWBQLj6vfLDALqq//bBAKC/r/9AwKhwMi7BAKKnIvVCUYxKuo9/DDpyc38di1xIRjCtI3M');
    encodedParams.set('ctl00$cphMain$txtRNCCedula', rnc);
    encodedParams.set('ctl00$cphMain$btnBuscarPorRNC', 'Buscar');

    let url = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx';

    let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'X-MicrosoftAjax': 'Delta=true',
        cookie: 'NSC_EHJJ_BQQ_TTM_MCWT=ffffffffc3a0e02245525d5f4f58455e445a4a423660; '
    },
    body: encodedParams
    };

    let res = ''
    let response = await fetch(url, options)
    if(response.ok){
        res = response.text()
    }
    return res

    // .then(Response => Response.text())
    // .catch(err => console.error('error:' + err));

    

}