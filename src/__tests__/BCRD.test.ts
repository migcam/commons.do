import { BCRD } from "../BCRD";

test('GetTodayUSDExchangeRate', async () => {
    expect(await BCRD.GetTodayUSDExchangeRate()).toBeGreaterThan(50);
});