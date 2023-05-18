import { BCRD } from "../src/BCRD";

test('GetTodayUSDExchangeRate', async () => {
    expect(await BCRD.GetTodayUSDExchangeRate()).toBeGreaterThan(50);
});