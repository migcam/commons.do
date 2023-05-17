import parse from "node-html-parser";
import { GetAxiosCookieJarWrapper } from "./Helpers";

export const RNC_URL : string = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx';
export const NCF_URL : string = 'https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx';

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
        let client = GetAxiosCookieJarWrapper();
        let document = parse(
            (await client.get(RNC_URL)).data
        );

        let config = {
            method: 'post',
            url: RNC_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
            data : {
                __VIEWSTATE : document.querySelector('#__VIEWSTATE')?.attributes['value'],
                __EVENTVALIDATION : document.querySelector('#__EVENTVALIDATION')?.attributes['value'],
                ctl00$cphMain$txtRNCCedula : rnc,
                ctl00$cphMain$btnBuscarPorRNC : 'Buscar'
            }
        }

        let response = await client.request(config)
        return JSON.stringify(response.data);
    }

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
