import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "../components/todoForm";
// form에서 일어나는 actoin test

describe("todoList Form 컴포넌트 테스트 진행", () => {
  test("초기에 필요한 엘리먼트가 렌더링 되었나요?", () => {
    render(<TodoForm />);
    const todoInputElement = screen.getByPlaceholderText("작업 추가");
    expect(todoInputElement).toBeInTheDocument();
  });

  test("렌더링 되었을 때, input element에 포커싱이 되었나요?", () => {
    render(<TodoForm />);
    const todoInputElement = screen.getByPlaceholderText("작업 추가");
    expect(todoInputElement).toHaveFocus();
  });

  test("입력 값에 따른 input 창의 변화 감지", async () => {
    render(<TodoForm />);
    const todoInputElement = screen.getByRole("textbox", "작업 추가");
    await userEvent.type(todoInputElement, "해야 할 일을 입력했습니다");
    expect(todoInputElement).toHaveValue("해야 할 일을 입력했습니다");
  });

  test("입력 받은 값이 있을 때, 버튼 클릭 또는 엔터를 통해 값을 전달하는가", async () => {
    const setTodoList = jest.fn();
    render(<TodoForm setTodoList={setTodoList} />);
    const todoInputElement = screen.getByPlaceholderText("작업 추가");
    const buttonElement = screen.getByRole("button", {
      name: "+",
    });
    await userEvent.type(todoInputElement, "TDD 주도 개발 연습");
    expect(todoInputElement).toHaveValue("TDD 주도 개발 연습");
    await userEvent.click(buttonElement);
    expect(setTodoList).toHaveBeenCalled(); // 호출이 되었는가
    expect(setTodoList).toBeCalledWith({
      todo: "TDD 주도 개발 연습",
      check: false,
      star: false,
    });
  });

  test("입력 받은 값이 없을 때, 버튼을 눌린다면 prop 받은 함수를 사용하지 않는가", async () => {
    const setTodoList = jest.fn();
    render(<TodoForm setTodoList={setTodoList} />);
    const buttonElement = screen.getByRole("button", {
      name: "+",
    });
    await userEvent.click(buttonElement);
    expect(setTodoList).not.toHaveBeenCalled(); // 호출이 되었는가
  });
});
