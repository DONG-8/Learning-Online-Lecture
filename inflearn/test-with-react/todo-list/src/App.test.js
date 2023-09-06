import { render, screen } from "@testing-library/react";
import TodoWrapper from "./components/TodoWrapper";

test("renders learn react link", () => {
  render(<TodoWrapper />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
