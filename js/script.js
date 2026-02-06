const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let isFiltered = false;

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTask);

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Namakan Tugas dan Tanggalnya!");
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
  <td class="row-actions">
  <button class="done-btn aksi pending">Selesai</button>
  <button class="delete-btn">Hapus</button>
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
    "Apakah kamu yakin ingin menghapus semua tugas?\nTindakan ini tidak bisa dibatalkan."
  );

  if (!confirmDelete) return;

  todoList.innerHTML = `
    <tr>
      <td colspan="4" class="empty">Belum Ada Tugas</td>
    </tr>
  `;
}

function filterTask() {
  const rows = todoList.querySelectorAll("tr");

  rows.forEach(row => {
    const status = row.querySelector(".status");
    if (!status) return;

    row.classList.toggle(
      "hide-row",
      !isFiltered && status.innerText !== "Selesai"
    );
  });

  isFiltered = !isFiltered;
}


function checkEmpty() {
  if (todoList.children.length === 0) {
    deleteAll();
  }
}
