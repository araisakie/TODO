"use strict";

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

// Todoがあれば表示する
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

// Enterを押下する
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    addTodo();
  } else {
    return alert("Todoが入力されていません");
  }
});

// Todoを追加する
function addTodo(todo) {
  let todoText = input.value;
  todoText = todoText.replace(/\s+/g, "");
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // 右クリックでTodoを削除する
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    // 左クリックで完了線をつける
    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

// Todoをローカルストレージに保存する
function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach((list) => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
