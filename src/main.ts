import { v4 as uuidv4 } from 'uuid';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ITask } from "./interfaces/task";

import "./index.css";

let tasks: ITask[] = [];

const taskForm = document.querySelector("#task_form") as HTMLFormElement;
const taskList = document.querySelector("#task_list") as HTMLUListElement;


taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title") as HTMLInputElement;
  const description = document.querySelector("#description") as HTMLInputElement;

  tasks.unshift({
    id: uuidv4(),
    title: title.value,
    description: description.value,
  });

  sessionStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);

  taskForm.reset();
  title.focus();

  Toastify({
    text: "Task added",
    backgroundColor: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
  }).showToast();
});


document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(sessionStorage.getItem("tasks") || "[]");
  renderTasks(tasks);
});


function renderTasks(tasks: ITask[]) {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer";

    const header = document.createElement("header");
    header.className = "flex justify-between";

    const title = document.createElement("span");
    title.innerText = task.title;
    header.append(title);

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "X";
    btnDelete.className = "bg-red-500 px-2 py-1 rounded-md";
    header.append(btnDelete);

    btnDelete.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });

    taskElement.append(header);

    const id = document.createElement("p");
    id.className = "text-gray-400 text-xs";
    id.innerText = task.id;
    taskElement.append(id);

    const description = document.createElement("div");
    description.innerText = task.description || "";
    taskElement.append(description);

    taskList.append(taskElement);
  });
}


/* 
function renderTasks(tasks: ITask[]) {
  let taskItem = "";
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    taskItem += `
      <div class="bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer">
        <header class="flex justify-between">
          <span>${task.title}</span>
          <button class="bg-red-500 px-2 py-1 rounded-md" id="${task.id}">X</button>
        </header>
        <p class="text-gray-400 text-xs">${task.id}</p>
        <div>${task.description}</div>  
      </div>
    `;

    const taskButton = document.querySelector(`#${task.id}`) as HTMLButtonElement;
    taskButton.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });

    taskList.innerHTML = taskItem;
  });
}
 */