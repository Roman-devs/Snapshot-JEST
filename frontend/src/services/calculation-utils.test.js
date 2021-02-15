import {sum} from "./calculation-utils"

test("Calculation Utility Test",()=>{
    const a = 2;
    const b = 4;
    const c = 64;
    const result = sum(a,b,c);
    expect(result).toBe(70);
})