import * as  superagent from 'superagent'

export default Transparency;

export module Transparency{
    export const PAYROLL_URL : string = 'https://api.transparencia.gob.do/api/nominas';

    export async function GetPayroll(params : PayrollParams){

        // let config = {
        //     method: 'get',
        //     url: PAYROLL_URL,
        //     headers: { 
        //         'authority': 'api.transparencia.gob.do', 
        //         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
        //     },
        //     params : params
        // };
        // let response = await axios.request(config)
        // return JSON.stringify(response.data);
        
        let response = await superagent
                    .get(PAYROLL_URL)
                    .query(params)
                    .set('Content-Type','application/x-www-form-urlencoded')
                    .set('user-agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36')
        
        return JSON.parse(response.text)
        
    }

    export interface PayrollParams{
        page: number
        periodo: string
        nombres: string
        apellidos: string
        institucion: string
        cargo: string
        lugar: string
        genero: string
        estatus: string
    }
}