import { effectsMiddleware } from "../src";

describe("index.ts", () => {
  it("should return the number four", () => {
    const result = effectsMiddleware();

    expect(typeof result).toBe("number");
    expect(result).toBe(4);
  });
});
