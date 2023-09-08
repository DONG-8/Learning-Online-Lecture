import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoTab from "../components/TodoTab";

describe("todoTab 컴포넌트 테스트 진행", () => {
  test("tab의 3가지 li를 잘 렌더링 시키는가", () => {
    render(<TodoTab />);
    const liElements = screen.getAllByTestId("todo", {
      exact: false,
    });
    expect(liElements).toHaveLength(3); // 3개의 lielement가 있는지 check
  });

  test("tab의 값의 변경에 따라 rendering 시킬 state를 변경시키는가", async () => {
    const setTabState = jest.fn();
    render(<TodoTab setTabState={setTabState} />);
    const li = screen.getByTestId("todo-done");
    await userEvent.click(li);
    expect(setTabState).toHaveBeenCalled();
    expect(setTabState).toBeCalledWith(li.id);
  });

  test("tabState의 상태에 맞춰 style이 변경이 되는가", async () => {
    // prop 받은 값에 대해서는 test코드에서는 자동으로 rendering 하지 않는다 따라서 rerender를 통해 다시 렌더링 할 수 있도록 테스트한다.
    const setTabState = jest.fn();
    const { rerender } = render(
      <TodoTab tabState="todo" setTabState={setTabState} />
    );
    const liDone = screen.getByTestId("todo-done");
    expect(liDone).toHaveStyle({ backgroundColor: "red" });
    rerender(<TodoTab tabState="done" setTabState={setTabState} />);
    expect(liDone).toHaveStyle({ backgroundColor: "blue" });
  });
});
