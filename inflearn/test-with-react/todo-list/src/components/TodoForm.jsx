import React, { useEffect, useRef, useState } from "react";

class TodoObject {
  constructor(todo) {
    this.todo = todo;
    this.check = false;
    this.star = false;
  }
}

export default function TodoForm({ setTodoList }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  function valueHandler(e) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  function todoHandler(e) {
    e.preventDefault();
    if (value === "") return;
    console.log("호출");
    const newTodo = new TodoObject(value);
    setTodoList(newTodo);
    setValue("");
  }

  useEffect(() => {
    if (value === "") {
      inputRef.current.focus();
    }
  });

  return (
    <form>
      <input
        type="text"
        placeholder="작업 추가"
        value={value}
        onChange={(e) => valueHandler(e)}
        ref={inputRef}
      />
      <button
        type="submit"
        name="submit-todo-button"
        onClick={(e) => {
          todoHandler(e);
        }}
      >
        +
      </button>
    </form>
  );
}
