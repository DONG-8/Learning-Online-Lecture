import "./App.css";
import TodoForm from "./components/TodoForm";
import { useState } from "react";
import TodoWrapper from "./components/TodoWrapper";
import TodoTab from "./components/TodoTab";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [tabState, setTabState] = useState("todo");
  function handleTodo(todo) {
    setTodoList([...todoList, todo]);
  }

  function handleTabState(id) {
    setTabState(id);
  }

  const props = { tabState, setTabState };
  return (
    <TodoWrapper>
      <TodoTab {...props} />
      <TodoForm setTodoList={handleTodo} />
    </TodoWrapper>
  );
}

export default App;
