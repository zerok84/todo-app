import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders App correctly", async () => {
  render(<App />);
  expect(await screen.getByText("TODO List App with MERN stack")).toBeDefined();
});
