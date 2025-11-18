const form = document.getElementById('todoForm');
const button = document.getElementById('toAddBtn');
const list = document.getElementById('taskList');



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const title = document.getElementById('title').value;
const description = document.getElementById('description').value;
const dueDate = document.getElementById('dueDate').value;
const taskTodo = document.createElement('li');

taskTodo.classList.add('task')
taskTodo.innerHTML =`
<h3>${title}</h3>
<button class="deleteBtn">X</button>
<p>${description || "no description" }</p>
<small>Due: ${new Date(dueDate).toLocaleString()}</small>

`
list.appendChild(taskTodo);

//Delete Item
const deleteBtn = document.querySelector('.deleteBtn')
deleteBtn.addEventListener("click", () =>{
    list.removeChild(taskTodo)
})

//Reset form
//form.reset();


})

//toggle mode effect
const modeBtn = document.get
const mode = document.getElementsByClassName('mode')
modeBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    document.body.style.backgroundColor ="black"

    
})