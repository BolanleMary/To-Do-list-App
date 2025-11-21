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
const modeBtn = document.getElementById('modeBtn')
const mode = document.querySelector('.mode')
modeBtn.addEventListener('click', (e) =>{
    e.preventDefault()
     colorChange =  document.body.style.backgroundColor 
mode.src = mode.src === '../assets/darkMode.svg'? "../assets/lightMode.svg": "../assets/darkMode.svg";
colorChange = mode.src === '../assets/darkMode.svg'?  "black": "white"
    
})