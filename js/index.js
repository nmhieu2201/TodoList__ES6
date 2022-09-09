const inputBox = document.querySelector("#newTask");
const addBtn = document.querySelector("#addItem");
const todoList = document.querySelector("#todo");
let listArr;
function validateData(value) {
  let valid = false;
  if (value.trim() !== "") {
    valid = true;
  }
  return valid;
}
addBtn.addEventListener("click", (event) => {
  let userData = inputBox.value;
  const isValid = validateData(userData);
  if (!isValid) {
    return;
  }
  let getLocalStorage = localStorage.getItem("todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
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
  listArr.forEach((ele, index) => {
    newTag += `
            <li>
                ${ele}
                <div class="icon">
                <i style="cursor: pointer" onclick="handleDeleleItem('${index}')"; class="fa-solid fa-trash-can"></i>
                <i style="cursor: pointer" onclick="handleCheckItem('${index}');" class="fa-regular fa-circle-check"></i>
                </div>
            </li>

        `;
  });
  todoList.innerHTML = newTag;
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
const handleCheckItem = (index) => {};
