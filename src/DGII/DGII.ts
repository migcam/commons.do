import parse from "node-html-parser";
import { Company } from "./Company";
import axios from 'axios';

export class DGII{
 
    public static async GetCompanyFromRNC(rnc : string): Promise<Company>{
        let res: any = await this.GetCompanyJSONFromRNC(rnc);
        
        return {
            id:res['Cédula/RNC'],
            socialReason:res['Nombre/Razón Social'],
            comercialName:res['Nombre Comercial'],
            category:res['Categoría'],
            paymentRegime:res['Régimen de pagos'],
            status:res['Estado'],
            economicActivity:res['Actividad Economica'],
            socialAdministration:res['Administracion Local'],
        }
    }

    private static async GetCompanyJSONFromRNC(rnc : string): Promise<any>{
        if(rnc.length != 9 && rnc.length != 11)
            throw new Error("This is not an RNC o Cedula");
    
        let rawHtml = await this.GetRawHTML(rnc)
        let document = parse(rawHtml)
    
        let selector = 'tr';
    
        let res = Array.from(document.querySelectorAll(selector)).reduce((acum,curr) => 
            Object.assign(acum,{
                [`${curr.childNodes[1].textContent}`]:curr.childNodes[2].textContent
            })
        ,{})
        
        return res;
    }

    private static async GetRawHTML(rnc : string) : Promise<string> 
    { 
        let config = {
            method: 'post',
            url: 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', 
            },
            data : {
                ctl00$smMain: 'ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC',
                __VIEWSTATE:'/wEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYCAgUPZBYEAgUPPCsADwEADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50ZmRkAgcPPCsADQBkGAIFH2N0bDAwJGNwaE1haW4kZ3ZCdXNjUmF6b25Tb2NpYWwPZ2QFI2N0bDAwJGNwaE1haW4kZHZEYXRvc0NvbnRyaWJ1eWVudGVzD2dkM6A6zdloNYs/efZ4JU/LIN3TDKM=',
                __EVENTVALIDATION :'/wEWBQLj6vfLDALqq//bBAKC/r/9AwKhwMi7BAKKnIvVCUYxKuo9/DDpyc38di1xIRjCtI3M',
                ctl00$cphMain$txtRNCCedula: rnc,
                ctl00$cphMain$btnBuscarPorRNC:'Buscar'
            }    
        }

        let response = await axios.request(config)
        return JSON.stringify(response.data);
    }

}