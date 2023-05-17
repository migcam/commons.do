import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie';

export class BCRD {
    public static async GetTodayUSDExchangeRate(){
        let rawRate = await this.GetActualExchangeRate();
        return rawRate.actualPurchaseValue
    }

    public static async GetActualExchangeRate() : Promise<GetActualExchangeRateResult>{
        //TODO: refactor
        let jar = new CookieJar();
        let client = wrapper(axios.create({ jar }));
        
        await client.head('https://www.bancentral.gov.do/SectorExterno/HistoricoTasas')

        let response = await client.get('https://www.bancentral.gov.do/Home/GetActualExchangeRate')

        return (response.data as BcrdResponse).result;

    }
}

export interface BcrdResponse {
    result: GetActualExchangeRateResult
    targetUrl: any
    success: boolean
    error: any
    unAuthorizedRequest: boolean
    __abp: boolean
}
  
export interface GetActualExchangeRateResult {
    actualPurchaseValue: number
    actualPurchaseInteranualValue: number
    actualPurchaseAccumulatedValue: number
    actualSellingValue: number
    actualSellingInteranualValue: number
    actualSellingAccumulatedValue: number
    date: Date
    actualPurchaseInteranualValueFormatted: string
    actualPurchaseAccumulatedValueFormatted: string
    actualPurchaseValueFormatted: string
    actualSellingInteranualValueFormatted: string
    actualSellingAccumulatedValueFormatted: string
    actualSellingValueFormatted: string
}
  