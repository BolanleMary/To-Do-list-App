const form = document.getElementById('todoForm');
const list = document.getElementById('taskList');

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const taskTitle = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    const newToDo ={
        title: taskTitle,
        description: description,
        dueDate:dueDate
    };

    //post to backend

    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(newToDo)
    })
    .then(res =>res.json())
    .then(savedTodo =>{
        
        function addTodoToUI(todo) {
    const taskTodo = document.createElement('li');
    taskTodo.classList.add('task');

    const due = new Date(todo.dueDate);

    taskTodo.innerHTML = `
        <h3>${todo.title}</h3>
        <div class ="taskWrapper">
        <button class="deleteBtn"><img src="../assets/deleteIcon.svg"</button>
        <p>${todo.description || "No description"}</p>
        </div>
        <small>Due: ${due.toLocaleString()}</small>
    `;

    list.appendChild(taskTodo);

    // Delete button
    const deleteBtn = taskTodo.querySelector('.deleteBtn');
    deleteBtn.addEventListener("click", () => {
        list.removeChild(taskTodo);
    });
}

    addTodoToUI(savedTodo);
    form.reset();
    })
.catch(err =>console.error("error posting:", err))
});

//GET- View/Load all Todo list
function loadTodos(){
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:Hv90HuNI/todo")
.then(response =>response.json)
.then(todos =>{
    list.innerHTML ="";

    todos.forEach(todo =>{
        const li = document.createElement('li');
        li.classList.add('task');

            const now = new Date();
            const due = new Date(dueDATE);

            if(TextDecoder.completed){
                li.classList.add('completed');
            }else if (due < now){
                li.classList.add('overdue');
            }

            li.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description || "No description"}</p>
            <small>Due: ${due.toLocaleDateString()}</small>
            <button onclick ="completeTodo(${todo.id})">Complete</button> 
            <button onclick ="deleteTodo(${todo.id}">Delete</button>
            `;

      list.appendChild(li);  
    });
})
.catch(error => console.error("error loading todo:", error))
    
}

loadTodos();