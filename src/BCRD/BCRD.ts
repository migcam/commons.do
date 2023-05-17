import { GetAxiosCookieJarWrapper } from '../Helpers';

export const BCRD_RATE_URL : string = 'https://www.bancentral.gov.do/SectorExterno/HistoricoTasas'
export const USD_RATE_URL : string = 'https://www.bancentral.gov.do/Home/GetActualExchangeRate'

export class BCRD {
    public static async GetTodayUSDExchangeRate(){
        let rawRate = await this.GetActualExchangeRate();
        return rawRate.actualPurchaseValue
    }

    public static async GetActualExchangeRate() : Promise<GetActualExchangeRateResult>{
        //TODO: refactor
        let client = GetAxiosCookieJarWrapper();
        
        await client.head(BCRD_RATE_URL)

        let response = await client.get(USD_RATE_URL)

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
  