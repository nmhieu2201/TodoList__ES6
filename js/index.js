const inputBox = document.querySelector("#newTask");
const addBtn = document.querySelector("#addItem");
const todoList = document.querySelector("#todo");
const todoCompleted = document.querySelector("#completed");
let listArr = [];

function validateData(value) {
  let valid = false;
  if (value.trim() !== "") {
    valid = true;
  }
  return valid;
}
addBtn.addEventListener("click", (event) => {
  let taskName = inputBox.value;
  const isValid = validateData(taskName);
  if (!isValid) {
    return;
  }
  let getLocalStorage = localStorage.getItem("todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push({
    task: taskName,
    checked: false,
    id: Math.random().toString(16).slice(2),
  });
  localStorage.setItem("todo", JSON.stringify(listArr));
  showTask();
});
inputBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.click();
  }
});
const showTask = () => {
  let getLocalStorage = localStorage.getItem("todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  let newTag = "";
  let completedTask = "";
  listArr.forEach((ele, index) => {
    if (ele.checked) {
      completedTask += `
      <li>
        ${ele.task}
        <div class="icon">
        <i style="cursor: pointer" onclick="handleDeleleItem('${index}')"; class="fa-solid fa-trash-can"></i>
        <i style="color:green ;"  onclick="handleCheckItem('${ele.id}');"  class="fa-solid fa-circle-check"></i>
        </div>
      </li>
      `;
    } else {
      newTag += `
      <li>
          ${ele.task}
          <div class="icon">
          <i style="cursor: pointer" onclick="handleDeleleItem('${index}')"; class="fa-solid fa-trash-can"></i>
          <i style="cursor: pointer" onclick="handleCheckItem('${ele.id}');" class="fa-regular fa-circle-check"></i>
          </div>
      </li>

  `;
    }
  });
  todoList.innerHTML = newTag;
  todoCompleted.innerHTML = completedTask;
  console.log(completedTask);
  inputBox.value = "";
};
showTask();
const handleDeleleItem = (index) => {
  let getLocalStorage = localStorage.getItem("todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(listArr));
  showTask();
};
const handleCheckItem = (id) => {
  console.log(id);
  listArr.forEach((el) => {
    if (el.id === id) {
      el.checked = !el.checked;
    }
  });
  console.log(listArr);
  showTask();
};
