import { render, screen } from "@testing-library/react";
import TodoWrapper from "./components/TodoWrapper";

describe("todo List 컴포넌트 종합 테스트", () => {});

test("renders learn react link", () => {
  render(<TodoWrapper />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
