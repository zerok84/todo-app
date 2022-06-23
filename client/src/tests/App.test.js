import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders App correctly", () => {
  render(<App />);
  expect(screen.getByText("TODO List App with MERN stack")).toBeDefined();
});
