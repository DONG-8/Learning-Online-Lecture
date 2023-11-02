import { rest } from "msw";

let todoList = [
  { todo: "할일하기", check: false, favorit: false, idx: 0 },
  { todo: "테스트 공부하기", check: true, favorit: true, idx: 1 },
  { todo: "운동 1시간 하기", check: false, favorit: true, idx: 2 },
];

export const handler = [
  rest.get("/todo", (req, res, ctx) => {
    return res(ctx.json(todoList));
  }),
  rest.post("/add", async (req, res, ctx) => {
    req.json().then((res) => {
      todoList = [...todoList, { ...res.data, idx: todoList.length + 1 }];
    });
    return res(ctx.status(200));
  }),
];

console.log(todoList, "todo");
