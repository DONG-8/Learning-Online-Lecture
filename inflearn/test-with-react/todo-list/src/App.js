import "./App.css";
import TodoForm from "./components/TodoForm";
import { useEffect, useState } from "react";
import TodoWrapper from "./components/TodoWrapper";
import TodoTab from "./components/TodoTab";
import TodoList from "./components/TodoList";
// import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [tabState, setTabState] = useState("todo");
  const [errState, setErrState] = useState(false);
  const props = { tabState, setTabState };

  function handleTodo(todo) {
    const idxLength = todoList.length;
    const nextIdx = idxLength + 1;
    setTodoList([...todoList, { ...todo, idx: nextIdx }]);
  }

  async function loadServerTodo() {
    try {
      const response = await fetch("/todo");
      const data = await response.json();
      const post = await fetch("/add", {
        method: "POST",
        body: JSON.stringify(data[0]),
      });
      const response2 = await fetch("/todo");
      const data2 = await response.json();
      console.log(data2);
      setTodoList(data);
    } catch {
      setErrState(true);
    }
  }

  useEffect(() => {
    loadServerTodo();
    console.log("렌더링");
  }, []);

  return (
    <TodoWrapper>
      <TodoTab {...props} />
      {todoList ? (
        <TodoList tabState={tabState} data={todoList} setData={setTodoList} />
      ) : (
        <>loading</>
      )}
      <TodoForm setTodoList={handleTodo} />
    </TodoWrapper>
  );
}

export default App;
