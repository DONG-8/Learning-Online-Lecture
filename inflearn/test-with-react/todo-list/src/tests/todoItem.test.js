import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../components/TodoItem";

describe("todo Item 테스트 진행", () => {
  test("<TodoItem/> rendering test", () => {
    const item = {
      todo: "투포인터 알고리즘 풀기",
      check: false,
      favorit: false,
    };
    render(<TodoItem todoInfo={item} />);
    const todoElement = screen.getByText("투포인터 알고리즘 풀기");
    expect(todoElement).toBeInTheDocument();
  });

  test("check를 클릭하게 되었을 때, prop 받은 상태 변경 함수를 호출하는가", async () => {
    const item = {
      todo: "투포인터 알고리즘 풀기",
      check: false,
      favorit: false,
      idx: 1,
    };
    const updateCheck = jest.fn();
    render(<TodoItem todoInfo={item} updateCheck={updateCheck} />);
    const checkboxElement = screen.getByRole("checkbox");
    await userEvent.click(checkboxElement);
    expect(updateCheck).toHaveBeenCalled();
    expect(updateCheck).toHaveBeenCalledWith(item.idx);
  });

  test("완료된 일의 경우 체크박스의 값이 true 인가", () => {
    const item = {
      todo: "투포인터 알고리즘 풀기",
      check: true,
      favorit: false,
      idx: 1,
    };
    render(<TodoItem todoInfo={item} />);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeChecked();
  });

  test("favorit이 true일 경우 채워진 이미지가 렌더링 되는가", () => {
    const item = {
      todo: "투포인터 알고리즘 풀기",
      check: true,
      favorit: true,
      idx: 1,
    };
    render(<TodoItem todoInfo={item} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("alt", "즐겨찾기 한 할 일 아이콘");
    expect(imgElement).not.toHaveAttribute(
      "alt",
      "즐겨찾기 하지 않은 할 일 아이콘"
    );
  });

  test("favorit의 상태를 바꿀 경우 prop 받은 상태 변경 함수를 사용하는가", async () => {
    const item = {
      todo: "투포인터 알고리즘 풀기",
      check: false,
      favorit: false,
      idx: 1,
    };
    const updateFavorit = jest.fn();
    render(<TodoItem todoInfo={item} updateFavorit={updateFavorit} />);
    const imgElement = screen.getByRole("img");
    await userEvent.click(imgElement);
    expect(updateFavorit).toHaveBeenCalled();
    expect(updateFavorit).toHaveBeenCalledWith(item.idx);
  });
});
