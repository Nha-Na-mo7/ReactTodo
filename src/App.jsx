import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo.jsx";
import { IncompleteTodos } from "./components/IncompleteTodos.jsx";
import { CompleteTodos } from "./components/CompleteTodos.jsx";

export const App = () => {
  // inputに入力した値のstate
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOを格納する配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了済みTODOの配列
  const [completeTodos, setCompleteTodos] = useState([]);

  // todoTextの値を入力された値として更新する
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 追加
  const onClickAdd = () => {
    // inputが空文字の時は走らない
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  // 削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // splice 指定したindexから指定の数値だけ配列を削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  // 完了ボタン
  const onClickComplete = (index) => {
    // 未完了TODOから押されたボタンのTODOを削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // 完了リストに入れる用の配列を新しく作成
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  // 戻す
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです！ 消化しろ</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
