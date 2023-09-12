import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// 각각의 렌더링 여부는 각 컴포넌트 test를 통해 확인 함.
// 종합적인 동작 테스트를 진행
describe("todo List 컴포넌트 종합 테스트", () => {
  test("입력 값에 따른 list item rendering 동작 테스트", async () => {
    render(<App />);
    const todoFormInputElement = screen.getByPlaceholderText("작업 추가");
    const todoFormButton = screen.getByRole("button", {
      name: "+",
    });
    await userEvent.type(todoFormInputElement, "할일하기");
    await userEvent.click(todoFormButton);
    // 입력값에 따른 렌더링이 되었는가
    const todoListElements = await screen.findAllByTestId("todo-item");
    expect(todoListElements).toHaveLength(1);
    const todoItem = screen.getByText("할일하기");
    expect(todoItem).toBeInTheDocument();
  });

  test("list Element의 check, favorit을 눌렸을 때, 화면상에 올바르게 렌더링 되는가", async () => {
    // 임의 데이터 생성
    render(<App />);
    const todoFormInputElement = screen.getByPlaceholderText("작업 추가");
    const todoFormButton = screen.getByRole("button", {
      name: "+",
    });
    await userEvent.type(todoFormInputElement, "할일하기");
    await userEvent.click(todoFormButton);
    const checkBoxItem = screen.getByRole("checkbox");
    const checkedItem = screen.getByText("할일하기");
    await userEvent.click(checkBoxItem);
    expect(checkBoxItem).toBeChecked();
    expect(checkedItem).not.toBeInTheDocument();

    const TabDoneElement = screen.getByTestId("todo-done");
    await userEvent.click(TabDoneElement);
    const doneListItem = screen.getByText("할일하기");
    expect(doneListItem).toBeInTheDocument();

    await userEvent.type(todoFormInputElement, "테스트 재밋당");
    await userEvent.click(todoFormButton);

    const todoTabElement = screen.getByTestId("todo-todo");
    await userEvent.click(todoTabElement);

    const todoItems = screen.getAllByTestId("todo-item");
    const todoFavoritItem = screen.getByText("테스트 재밋당");
    expect(todoItems).toHaveLength(1);
    expect(todoFavoritItem).toBeInTheDocument();

    const todoFavoritImg = screen.getByRole("img");
    await userEvent.click(todoFavoritImg);

    const TabFavoritElement = screen.getByTestId("todo-favorit");
    await userEvent.click(TabFavoritElement);
    const favoritLists = screen.getAllByTestId("todo-item");
    expect(todoFavoritItem).toBeInTheDocument();
    expect(favoritLists).toHaveLength(1);
  });
});
