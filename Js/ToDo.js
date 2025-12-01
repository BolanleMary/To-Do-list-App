
//    DARK / LIGHT MODE

const toggleBtn = document.getElementById("modeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


const form = document.getElementById("todoForm");
const list = document.getElementById("list");
const toAddBtn = document.getElementById("toAddBtn");
const cancelEdit = document.getElementById("cancelEdit");
const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");


let editingId = null;

const API = "https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo";



//    SUBMIT (create or update)

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        title: title.value,
        description: description.value,
        due_date: dueDate.value,
        completed: false
    };

    if (editingId) {
      
        updateTodo(editingId, data);
    } else {
        createTodo(data);
    }
});


//    CREATE

function createTodo(data) {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        form.reset();
        loadTodos();
    });
}


//    EDIT (LOAD INTO FORM)

function editTodo(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(todo => {
            title.value = todo.title;
            description.value = todo.description;
            dueDate.value = todo.due_date;

            editingId = id;
            toAddBtn.textContent = "Update Task";
            cancelEdit.style.display = "inline-block";
        });
}


//    CANCEL EDIT

cancelEdit.addEventListener("click", () => {
    editingId = null;
    form.reset();
    toAddBtn.textContent = "Add Task";
    cancelEdit.style.display = "none";
});


//    UPDATE

function updateTodo(id, data) {
    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        editingId = null;
        form.reset();
        toAddBtn.textContent = "Add Task";
        cancelEdit.style.display = "none";
        loadTodos();
    });
}


//    DELETE with  confirmation

function deleteTodo(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTodos());
}


//    MARK COMPLETE / INCOMPLETE

function toggleComplete(id, currentState) {
    fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentState })
    })
    .then(() => loadTodos());
}


   
//    LOAD ALL TODOS

function loadTodos() {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo")
    .then(res => res.json())
    .then(todos => {
        list.innerHTML = "";

        todos.forEach(todo => {
            const due = new Date(todo.due_date);
            const now = new Date();

            const card = document.createElement("div");
            card.className = "task";

            if (todo.completed) card.classList.add("completed");
            if (due < now && !todo.completed) card.classList.add("overdue");

            card.innerHTML = `
                <div class="task-header">
                    <h3>${todo.title}</h3>
                    <p>${todo.description || "No description"}</p>
                <small>Due: ${due.toLocaleString()}</small>
                    <div class="task-buttons">
                        <button onclick="toggleComplete(${todo.id}, ${todo.completed})">
                            ${todo.completed ? "Undo" : "Done"}
                        </button>
                        <button onclick="editTodo(${todo.id})">Edit</button>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                </div>

                
            `;

            list.appendChild(card);

           
        });
    });
}

loadTodos();
