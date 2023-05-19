import { DGII } from "../src/DGII";

test('GetCompanyFromRNC', async () => {
    let company = await DGII.GetCompanyFromRNC('401506254')
    expect(company.comercialName).toBe('DGII');
});

test('ValidateNonElectronicNCF', async () => {
    let res = await DGII.GetCompanyFromRNCNCF('101602465','B0101153315')
    expect(res.NameOrSocialReason).toBe('BRAVO S A');
});