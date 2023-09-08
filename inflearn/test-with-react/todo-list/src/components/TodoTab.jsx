import React from "react";

export default function TodoTab({ tabState, setTabState }) {
  function tabHandler(e) {
    setTabState(e.target.id);
  }
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "",
        listStyleType: "none",
      }}
    >
      <li
        data-testid="todo-todo"
        onClick={(e) => tabHandler(e)}
        style={{ backgroundColor: tabState === "todo" ? "blue" : "red" }}
      >
        해야 할 일
      </li>
      <li
        data-testid="todo-done"
        onClick={(e) => tabHandler(e)}
        style={{ backgroundColor: tabState === "done" ? "blue" : "red" }}
      >
        다 한 일
      </li>
      <li
        data-testid="todo-favorit"
        onClick={(e) => tabHandler(e)}
        style={{ backgroundColor: tabState === "favorit" ? "blue" : "red" }}
      >
        다 한 일
      </li>
    </nav>
  );
}
