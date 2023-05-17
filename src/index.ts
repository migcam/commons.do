import { BCRD } from "./BCRD/BCRD";
import { DGII } from "./DGII/DGII";

(async () => {
    // let rnc ='130334269'
    // let company = await DGII.GetCompanyFromRNC(rnc)
    // console.log(company)
    let rate = await BCRD.GetTodayUSDExchangeRate();
    console.log(rate)
})();