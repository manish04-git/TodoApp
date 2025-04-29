const todoForm=document.querySelector('form');
const todoInput=document.getElementById('todo-input');
const todoListUL=document.getElementById('todo-list')

let allTodos=getTodos();
updateTodoList();

todoForm.addEventListener('submit',function(e){
    e.preventDefault();
    addTodo();
})
function addTodo(){
const todoText=todoInput.value.trim();
if(todoText.length>0){
const todoObject={
Text:todoText,
completed:false
}
    allTodos.push(todoObject);
    todoInput.value="";
    updateTodoList();
    saveTodos();

}

}
function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem=createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo,todoIndex){
    const todoId="todo-"+todoIndex;
    const todoLi=document.createElement("li");
    const todoText=todo.Text;
    todoLi.className="todo";
    todoLi.innerHTML=`
     <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>

    `
    const deleteButton=todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click",()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox=todoLi.querySelector("input");
    checkbox.addEventListener("change",()=>{
        allTodos[todoIndex].completed=checkbox.checked;
        saveTodos();
    })
    checkbox.checked=todo.completed;
    return todoLi
}
function deleteTodoItem(todoIndex){
allTodos=allTodos.filter((_,i)=> i !==todoIndex);
saveTodos();
updateTodoList();
}

function saveTodos(){
    const todosJson=JSON.stringify(allTodos)
    localStorage.setItem("todos",todosJson);
}

function getTodos(){
    const todos=localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}