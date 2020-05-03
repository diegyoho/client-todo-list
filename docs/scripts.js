const listElement = document.querySelector('#todos ul')
const addTodoInput = document.querySelector('#new-todo input')
const addTodoButton = document.querySelector('#new-todo button')

const todos = loadFromStorage()

showList()

// BASIC FUNCTIONS

function addTodo(todo) {
    todos.push({
        todo,
        completed: false
    })
    saveToStorage()
    showList()
}

function removeTodo(id) {
    todos.splice(id, 1)
    saveToStorage()
    showList()
}

function completeTodo(id, completed) {
    todos[id].completed = completed
    saveToStorage()
    showList()
}

// FRONT-END

addTodoButton.addEventListener('click', () => {
    if(addTodoInput.value !== '') {
        addTodo(addTodoInput.value)
        addTodoInput.value = ''
    }
})

function createListItem(todo, id) {
    const li = document.createElement('li')
    li.id = id

    const p = document.createElement('p')
    p.innerText = todo.todo
    
    li.appendChild(createCompleteButton(id, todo.completed))
    li.appendChild(p)
    li.appendChild(createRemoveButton(id))

    if(todo.completed)
        li.classList.add('completed')

    return li
}

function createRemoveButton(id) {
    const removeButton = document.createElement('button')
    removeButton.classList.add('delete')
    removeButton.innerHTML = '<i class="material-icons">close</i>'

    removeButton.addEventListener('click', () => {
        removeTodo(id)
    } )

    return removeButton
}

function createCompleteButton(id, completed) {
    const completeButton = document.createElement('input')
    completeButton.type = 'checkbox'
    completeButton.checked = completed
    completeButton.addEventListener('click', event => {
        completeTodo(id, !completed)
    } )

    return completeButton
}

function showList() {
    if(todos.length === 0) {
        listElement.innerHTML = 'Add some todos!'
        return
    }
    
    listElement.innerHTML = ''

    todos.forEach((todo, index) => listElement.appendChild(createListItem(todo, index)))
}

// PERSISTENCE

function loadFromStorage() {
    const data = localStorage.getItem('todo-list') || '[]'
    return JSON.parse(data)
}

function saveToStorage() {
    localStorage.setItem('todo-list', JSON.stringify(todos))
}