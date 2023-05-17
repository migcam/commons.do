import { BCRD } from "../BCRD/BCRD";

test('GetTodayUSDExchangeRate', async () => {
    expect(await BCRD.GetTodayUSDExchangeRate()).toBeGreaterThan(50);
});