import { DGII } from "../DGII/DGII";

test('GetCompanyFromRNC', async () => {
    let company = await DGII.GetCompanyFromRNC('401506254')
    expect(company.comercialName).toBe('DGII');
});