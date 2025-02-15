import React from "react";
import { render } from "@testing-library/react";
import Skeletons from "./index"; // Adjust the import path if needed

describe("Skeletons Component", () => {
  it("renders the correct number of skeletons", () => {
    const { container } = render(<Skeletons length={5} />);
    const skeletons = container.querySelectorAll(".ant-skeleton-button");
    expect(skeletons.length).toBe(5);
  });

  it("applies custom width and height", () => {
    const { container } = render(<Skeletons width={200} height={100} />);
    const skeleton = container.querySelector(
      ".ant-skeleton-button",
    ) as HTMLElement;

    expect(skeleton).toHaveStyle({
      width: "200px",
      height: "100px",
    });
  });

  it("applies border radius", () => {
    const { container } = render(<Skeletons radius={10} />);
    const skeleton = container.querySelector(
      ".ant-skeleton-button",
    ) as HTMLElement;

    expect(skeleton).toHaveStyle({
      borderRadius: "10px",
    });
  });

  it("renders default props correctly", () => {
    const { container } = render(<Skeletons />);
    const skeletons = container.querySelectorAll(".ant-skeleton-button");

    expect(skeletons.length).toBe(6); // Default length is 6
    expect(skeletons[0]).toHaveStyle({
      width: "340px",
      height: "150px",
      borderRadius: "6px",
    });
  });
});
