import * as  superagent from 'superagent'

export default BCRD;

export module BCRD {

    export const BCRD_RATE_URL : string = 'https://www.bancentral.gov.do/SectorExterno/HistoricoTasas'
    export const USD_RATE_URL : string = 'https://www.bancentral.gov.do/Home/GetActualExchangeRate'

    export async function GetTodayUSDExchangeRate(): Promise<number>{
        let rawRate = await GetActualExchangeRate();
        return rawRate.actualPurchaseValue
    }

    // Axios implementation
    // async function GetActualExchangeRate() : Promise<GetActualExchangeRateResult>{
    //     let client = wrapper(axios.create({ jar: new CookieJar() }));
    //     await client.head(BCRD_RATE_URL)
    //     let response = await client.get(USD_RATE_URL)
    //     return (response.data as BcrdResponse).result;
    // }

    async function GetActualExchangeRate() : Promise<GetActualExchangeRateResult>{
        let myagent = superagent.agent();
        await myagent.head(BCRD_RATE_URL)
        let response = await myagent.get(USD_RATE_URL)
        return (JSON.parse(response.text) as  BcrdResponse).result;
    }

    interface BcrdResponse {
        result: GetActualExchangeRateResult
        targetUrl: any
        success: boolean
        error: any
        unAuthorizedRequest: boolean
        __abp: boolean
    }

    interface GetActualExchangeRateResult {
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
}