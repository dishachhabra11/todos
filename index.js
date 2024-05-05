//basic express boiler plate code
const express = require("express");
const app = express();

const cors = require("cors");
const { todo } = require("./db");
const { createTodo, updateTodo } = require("./types");

app.use(express.json());
app.use(cors());

app.get("/getTodos", async function (req, res) {
  const list = await todo.find({});
  res.json({ list });
});

app.post("/getTodos", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ msg: "you sent the wrong inputs" });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedUpdatePayload = updateTodo.safeParse(updatePayload);
  if (!parsedUpdatePayload.success) {
    res.status(411).json({
      msg: "you send the wrong input.",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.json({
    msg: "todo marked as completed",
  });
});

app.listen(3001);
