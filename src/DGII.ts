import axios from "axios";
import { parse } from "node-html-parser";

export default DGII;

export module DGII {
    export const RNC_URL : string = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx';
    export const NCF_URL : string = 'https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx';
 
    export async function GetCompanyFromRNC(rnc : string): Promise<Company>{
        let res: any = await GetCompanyJSONFromRNC(rnc);
        
        return {
            id: res['Cédula/RNC'],
            socialReason: res['Nombre/Razón Social'],
            comercialName: res['Nombre Comercial'],
            category: res['Categoría'],
            paymentRegime: res['Régimen de pagos'],
            status: res['Estado'],
            economicActivity: res['Actividad Economica'],
            socialAdministration: res['Administracion Local']
        }
    }

    async function GetCompanyJSONFromRNC(rnc : string): Promise<any>{
        if(rnc.length != 9 && rnc.length != 11)
            throw new Error("This is not an RNC o Cedula");
    
        let rawHtml = await GetRawHTML(rnc)
        let rawDoc = parse(rawHtml)
    
        let selector = 'tr';
    
        let res = Array.from(rawDoc.querySelectorAll(selector)).reduce((acum,curr) => 
            Object.assign(acum,{
                [`${curr.childNodes[1].textContent}`]:curr.childNodes[2].textContent
            })
        ,{})
        
        return res;
    }

    async function GetRawHTML(rnc : string) : Promise<string> 
    { 
        let rawDoc = parse((await axios.get(RNC_URL)).data);

        let config = {
            method: 'POST',
            url: RNC_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
            data : {
                __VIEWSTATE : rawDoc.querySelector('#__VIEWSTATE')?.attributes['value'],
                __EVENTVALIDATION : rawDoc.querySelector('#__EVENTVALIDATION')?.attributes['value'],
                ctl00$cphMain$txtRNCCedula : rnc,
                ctl00$cphMain$btnBuscarPorRNC : 'Buscar'
            }
        }

        let response = await axios.request(config)
        return JSON.stringify(response.data);
    }

    export async function GetCompanyFromRNCNCF(rnc:string, ncf:string) : Promise<NCFResult>{
        let res = await GetRawResultFromRNCandNCF(rnc,ncf);
        return {
            RncOrCedula: res['RNC / Cédula'],
            NameOrSocialReason: res['Nombre / Razón Social'],
            ReceiptType: res['Tipo de comprobante'],
            NCF: res['NCF'],
            State: res['Estado'],
            ValidUntil: res['Válido hasta'],
        };
    }

    async function GetRawResultFromRNCandNCF(rnc:string, ncf:string): Promise<any>{
        if(rnc.length != 9 && rnc.length != 11)
            throw new Error("This is not an RNC o Cedula");
    
        let rawHtml = await ValidateNonElectronicNCF(rnc,ncf)
        let rawDoc = parse(rawHtml)
    
        let selector = 'tr';
        let res = rawDoc.querySelectorAll(selector).reduce((acum,curr) => 
            Object.assign(acum,{
                [`${curr.childNodes[1].textContent}`]:curr.childNodes[3].childNodes[1].textContent
            })
        ,{})
        
        return res;
    }

    async function ValidateNonElectronicNCF(rnc:string, ncf:string): Promise<string>{
        if(rnc.length != 9 && rnc.length != 11)
            throw new Error("This is not an RNC o Cedula");
        
        if(ncf.length != 11 && ncf.length != 13)
            throw new Error("This is not a NCF");

        let rawDoc = parse((await axios.get(NCF_URL)).data);

        var config = {
            method: 'POST',
            url: NCF_URL,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
            },
            data: {
              __VIEWSTATE: rawDoc.querySelector('#__VIEWSTATE')?.attributes['value'],
              __EVENTVALIDATION: rawDoc.querySelector('#__EVENTVALIDATION')?.attributes['value'],
              ctl00$cphMain$txtRNC: rnc,
              ctl00$cphMain$txtNCF:  ncf,
              __ASYNCPOST: 'true',
              ctl00$cphMain$btnConsultar: 'Buscar'
            }
        };

        let response = await axios.request(config)
        return JSON.stringify(response.data);
    }


    export interface Company{
        id : string,
        socialReason : string,
        comercialName : string,
        category : string,
        paymentRegime : string,
        status : string,
        economicActivity : string,
        socialAdministration : string
    }

    export interface NCFResult{
        RncOrCedula:string,
        NameOrSocialReason:string,
        ReceiptType:string,
        NCF:string,
        State:string,
        ValidUntil:string
    }

}