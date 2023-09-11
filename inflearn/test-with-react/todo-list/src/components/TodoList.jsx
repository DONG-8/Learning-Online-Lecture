import TodoItem from "./TodoItem";

// 데이터 필터링 및 각 아이템의 action에 대한 조치
export default function TodoList({ tabState, data, setData }) {
  function updateCheck(idx) {
    const newData = data.map((v, i) => {
      if (v.idx === idx) {
        return { ...v, check: !v.check };
      }
      return { ...v };
    });
    setData(newData);
  }

  function updateFavorit(idx) {
    const newData = data.map((v, i) => {
      if (v.idx === idx) {
        return { ...v, favorit: !v.favorit };
      }
      return v;
    });
    setData(newData);
  }

  function dataFilterFunction() {
    const filterData = data.filter((v) => {
      if (tabState === "todo" && v.check === false) {
        return v;
      }
      if (tabState === "done" && v.check === true) {
        return v;
      }
      if (tabState === "favorit" && v.check === false && v.favorit === true) {
        return v;
      }
    });
    return filterData.map((todoItemData, idx) => {
      return (
        <TodoItem
          todoInfo={{ ...todoItemData }}
          key={idx + "todo"}
          updateCheck={updateCheck}
          updateFavorit={updateFavorit}
        />
      );
    });
  }

  return <>{dataFilterFunction()}</>;
}
