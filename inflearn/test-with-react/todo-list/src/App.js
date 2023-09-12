import "./App.css";
import TodoForm from "./components/TodoForm";
import { useState } from "react";
import TodoWrapper from "./components/TodoWrapper";
import TodoTab from "./components/TodoTab";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [tabState, setTabState] = useState("todo");
  // const [data, setData] = useState([
  //   { todo: "할일하기", check: false, favorit: false, idx: 0 },
  //   { todo: "테스트 공부하기", check: true, favorit: true, idx: 1 },
  //   { todo: "운동 1시간 하기", check: false, favorit: true, idx: 2 },
  // ]);

  function handleTodo(todo) {
    const idxLength = todoList.length;
    const nextIdx = idxLength + 1;
    setTodoList([...todoList, { ...todo, idx: nextIdx }]);
  }

  const props = { tabState, setTabState };
  return (
    <TodoWrapper>
      <TodoTab {...props} />
      <TodoList tabState={tabState} data={todoList} setData={setTodoList} />
      <TodoForm setTodoList={handleTodo} />
    </TodoWrapper>
  );
}

export default App;
