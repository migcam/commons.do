import { DGII } from "./DGII";

(async () => {
    let rnc ='130334269'
    // var dgii = new DGII();
    let company = await DGII.GetCompanyFromRNC(rnc)
    console.log(company)
})();
