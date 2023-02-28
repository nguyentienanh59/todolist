const todosApi = "https://jsonplaceholder.typicode.com/users/1/todos";
const todoListBlock = document.querySelector(".todoList");
const createBtn = document.querySelector(".btn-add");

function startTodo() {
  getTodos(renderTodos);
  handleCreateTodo();
}
startTodo();

function getTodos(callback) {
  fetch(todosApi)
    .then((response) => response.json())
    .then(callback);
}

function createTodo(data, callback) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(todosApi, options)
    .then((response) => response.json())
    .then(callback);
}

function renderTodos(todos) {
  let html = todos.map(function (todo) {
    return `
          <li class="todo-list-${todo.id}">${todo.title} <i class="fas fa-trash onclick="handleDeleteTodo(${todo.id})"></i></li>
          `;
  });
  todoListBlock.innerHTML = html.join("");
}

function handleCreateTodo() {
  createBtn.onclick = function () {
    let title = document.querySelector(".inputText").value;
    let formdata = {
      title: title,
    };
    createTodo(formdata, function () {
      getTodos(renderTodos);
    });
  };
}

function handleDeleteTodo(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(todosApi + "/" + id, options)
    .then((response) => response.json())
    .then(function () {
      let todoItem = document.querySelector(".todo-list-" + id);
      if (todoItem) {
        todoItem.remove();
      }
    });
}
