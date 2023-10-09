import fs from "fs/promises";
import { globalTrim } from "./helpers";
import { parse } from "../src/lib/core/parser";

describe("Parser Function", () => {
  it("parses a file with a single definition", async () => {
    const filename = "test/artifacts/single.interface.ts";
    const expected = (
      await fs.readFile("test/artifacts/single.graphql")
    ).toString();
    const gql = parse(filename);

    expect(globalTrim(gql)).toBe(globalTrim(expected));
  });

  it("passes a file with multiple definitions", async () => {
    const filename = "test/artifacts/multiple.interface.ts";
    const expected = (
      await fs.readFile("test/artifacts/multiple.graphql")
    ).toString();
    const gql = parse(filename);

    expect(globalTrim(gql)).toBe(globalTrim(expected));
  });
});
