import { screen, render, getAllByTestId } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("<TodoList/> 컴포넌트 테스트 진행", () => {
  const data = [
    { todo: "할일하기", check: false, favorit: false, idx: 0 },
    { todo: "테스트 공부하기", check: true, favorit: true, idx: 1 },
    { todo: "운동 1시간 하기", check: false, favorit: true, idx: 2 },
  ];
  test("rendering 테스트", () => {
    render(<TodoList data={data} tabState="todo" />);
    const listElements = screen.getAllByTestId("todo-item");
    expect(listElements).toHaveLength(2);
  });

  test("tabState가 favorit일때, 완료된 일을 제외한 favorit이 렌더링이 되는가", () => {
    render(<TodoList data={data} tabState="favorit" />);
    const listElements = screen.getAllByTestId("todo-item");
    expect(listElements).toHaveLength(1);
  });
});
