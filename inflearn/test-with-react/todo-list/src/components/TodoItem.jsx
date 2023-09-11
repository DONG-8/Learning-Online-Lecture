import React from "react";
import fill from "../assets/fillstar.png";
import notFill from "../assets/notfillstar.png";

export default function TodoItem({ todoInfo, updateCheck, updateFavorit }) {
  return (
    <div data-testid="todo-item">
      <input
        type="checkbox"
        checked={todoInfo.check}
        onClick={() => updateCheck(todoInfo.idx)}
        readOnly
      />
      {todoInfo.todo}
      {todoInfo.favorit ? (
        <img
          src={fill}
          alt="즐겨찾기 한 할 일 아이콘"
          onClick={() => updateFavorit(todoInfo.idx)}
        />
      ) : (
        <img
          src={notFill}
          alt="즐겨찾기 하지 않은 할 일 아이콘"
          onClick={() => updateFavorit(todoInfo.idx)}
        />
      )}
    </div>
  );
}
