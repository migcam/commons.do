import parse from "node-html-parser";
import { Company } from "./Company";
import axios from 'axios';

export class DGII{
 
    public static async GetCompanyFromRNC(rnc : string): Promise<Company>{
        if(rnc.length != 9 && rnc.length != 11)
            throw new Error("This is not an RNC o Cedula");
    
        let rawHtml = await this.GetRawHTML(rnc)
        let document = parse(rawHtml)
    
        let selector = 'tr';
    
        let res :any = Array.from(document.querySelectorAll(selector)).reduce((acum,curr) => 
            Object.assign(acum,{
                [`${curr.childNodes[1].textContent}`]:curr.childNodes[2].textContent
            })
        ,{})
        
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
     
    public static async GetCompanyJSONFromRNC(rnc : string): Promise<any>{
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
        let  body = {
            'ctl00%24smMain': 'ctl00%24cphMain%24upBusqueda%7Cctl00%24cphMain%24btnBuscarPorRNC',
            __VIEWSTATE:'%2FwEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYCAgUPZBYEAgUPPCsADwEADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50ZmRkAgcPPCsADQBkGAIFH2N0bDAwJGNwaE1haW4kZ3ZCdXNjUmF6b25Tb2NpYWwPZ2QFI2N0bDAwJGNwaE1haW4kZHZEYXRvc0NvbnRyaWJ1eWVudGVzD2dkM6A6zdloNYs%2FefZ4JU%2FLIN3TDKM%3D',
            __EVENTVALIDATION :'%2FwEWBQLj6vfLDALqq%2F%2FbBAKC%2Fr%2F9AwKhwMi7BAKKnIvVCUYxKuo9%2FDDpyc38di1xIRjCtI3M',
            'ctl00%24cphMain%24txtRNCCedula':rnc,
            'ctl00%24cphMain%24btnBuscarPorRNC':'Buscar'
        }

        let data : string = Object.entries(body).reduce(
            (accumulator, currentValue) => accumulator + `${currentValue[0]}=${currentValue[1]}&` 
            ,'')
        
        let config = {
            method: 'post',
            url: 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36', 
            },
            data : data
        }

        let response = await axios.request(config)
        return JSON.stringify(response.data);
    }

}