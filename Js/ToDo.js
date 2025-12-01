
const form = document.getElementById("todoForm");
const list = document.getElementById("list");
const toAddBtn = document.getElementById("toAddBtn");
const cancelEdit = document.getElementById("cancelEdit");
const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");


let editValue = null;

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

    if (editValue) {
      
        updateTodo(editValue, data);
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
        allTodos();
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

           editValue = id;
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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        editValue = null;
        form.reset();
        toAddBtn.textContent = "Add Task";
        cancelEdit.style.display = "none";
        allTodos();
    });
}


//    DELETE with  confirmation

function deleteTodo(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
    .then(() => allTodos());
}


//    MARK COMPLETE / INCOMPLETE

function toggleComplete(id, currentState) {
    fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentState })
    })
    .then(() => allTodos());
}


   
//    LOAD ALL TODOS

function allTodos() {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo")
    .then(res => res.json())
    .then(todos => {
        list.innerHTML = "";

        todos.reverse().forEach(todo => {
            const due = new Date(todo.due_date);
            const now = new Date();

            const card = document.createElement("div");
            card.className = "task";

            if (todo.completed) card.classList.add("completed");
            if (due < now && !todo.completed) card.classList.add("overdue");

            card.innerHTML = `
                <div class="taskHeader">
                <div class="taskButtons">
                        <button onclick="toggleComplete(${todo.id}, ${todo.completed})">
                            ${todo.completed ? "Undo" : "Done"}
                        </button>
                        <button onclick="editTodo(${todo.id})">Edit</button>
                        <button onclick="deleteTodo(${todo.id})"><img src ="../assets/deleteIcon.svg"/></button>
                    </div>
                    <h3>${todo.title}</h3>
                    
                    <p>${todo.description || "No description"}</p>
                <small>Due: ${due.toLocaleString()}</small>
                    
                </div>

                
            `;

            list.appendChild(card);

           
        });
    });
}

allTodos();
