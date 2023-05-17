import { DGII } from "./DGII/DGII";


(async () => {
    let rnc ='130334269'
    let company = await DGII.GetCompanyFromRNC(rnc)
    console.log(company)
})();