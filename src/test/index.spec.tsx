import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { JSONTree, KeyPath } from "../main.ts";

const BASIC_DATA = { a: 1, b: "c" };

describe("JSONTree", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<JSONTree data={BASIC_DATA} />);
  });

  it("should render basic tree", () => {
    render(<JSONTree data={BASIC_DATA} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("should resolve types", () => {
    const keyPath: KeyPath = ["root"];
    render(<JSONTree data={BASIC_DATA} keyPath={keyPath} />);
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });
});
