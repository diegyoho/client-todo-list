const listElement = document.querySelector('#todos ul')
const addTodoInput = document.querySelector('#new-todo input')
const addTodoButton = document.querySelector('#new-todo button')

const todos = loadFromStorage()

showList()

// BASIC FUNCTIONS

function addTodo(todo) {
    todos.push(todo)
    saveToStorage()
    showList()
}

function removeTodo(id) {
    todos.splice(id, 1)
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

function createListItem(value, id) {
    const li = document.createElement('li')
    li.id = id
    li.innerText = value

    const removeButton = document.createElement('button')
    removeButton.classList.add('delete')
    removeButton.innerHTML = '<i class="material-icons">close</i>'

    removeButton.addEventListener('click', () => {
        removeTodo(id)
    } )

    li.appendChild(removeButton)

    return li
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