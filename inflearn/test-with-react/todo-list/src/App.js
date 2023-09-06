import "./App.css";
import TodoForm from "./components/TodoForm";
import { useState } from "react";
import TodoWrapper from "./components/TodoWrapper";

function App() {
  const [todoList, setTodoList] = useState([]);
  function handleTodo(todo) {
    setTodoList([...todoList, todo]);
  }

  return (
    <TodoWrapper>
      <TodoForm setTodoList={handleTodo} />
    </TodoWrapper>
  );
}

export default App;
