const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let isFiltered = false;
let asc = true;

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", sortByDeadline);

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Tulis Tugas dan Tentuin Tanggalnya!");
    return;
  }

  if (todoList.querySelector(".empty")) {
    todoList.innerHTML = "";
  }

  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td class="task">${task}</td>
  <td>${date}</td>
  <td class="status">Belum Selesai</td>
  <td>
    <div class="aksi-cell">
      <div class="row-actions">
        <button class="done-btn aksi pending">Selesai</button>
        <button class="delete-btn">Hapus</button>
      </div>
    </div>
  </td>

`;

  tr.addEventListener("click", function (e) {

    if (e.target.classList.contains("done-btn")) {
  const taskText = tr.querySelector(".task");
  const statusText = tr.querySelector(".status");
  const doneBtn = e.target;

  const isDone = taskText.classList.toggle("done");

  statusText.innerText = isDone ? "Selesai" : "Belum Selesai";

  doneBtn.innerText = isDone ? "Belum Selesai" : "Selesai";

  doneBtn.classList.toggle("success", isDone);
  doneBtn.classList.toggle("pending", !isDone);
}

    if (e.target.classList.contains("delete-btn")) {
      tr.remove();
      checkEmpty();
    }
  });

  todoList.appendChild(tr);
  taskInput.value = "";
  dateInput.value = "";
}

function deleteAll() {
 const confirmDelete = confirm(
    "Yakin mau hapus semua tugas?\nGk bisa dibatalin loh !."
  );

  if (!confirmDelete) return;

  todoList.innerHTML = `
    <tr>
      <td colspan="4" class="empty">Belum Ada Tugas</td>
    </tr>
  `;
}

function sortByDeadline() {
  const rows = Array.from(todoList.querySelectorAll("tr"));
  if (rows.length === 0 || rows[0].classList.contains("empty-row")) return;

  rows.sort((a, b) => {
    const dateA = new Date(a.children[1].innerText);
    const dateB = new Date(b.children[1].innerText);
    return asc ? dateA - dateB : dateB - dateA;
  });

  asc = !asc;

  todoList.innerHTML = "";
  rows.forEach(row => todoList.appendChild(row));
}

function checkEmpty() {
  if (todoList.children.length === 0) {
    deleteAll();
  }
}
