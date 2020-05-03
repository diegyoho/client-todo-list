const listElement = document.querySelector('#todos ul')
const addTodoInput = document.querySelector('#new-todo input')
const addTodoButton = document.querySelector('#new-todo button')

const todos = loadFromStorage()

showList()

addTodoButton.addEventListener('click', () => {
    if(addTodoInput.value !== '') {
        todos.push(addTodoInput.value)
        addTodoInput.value = ''
        showList(todos)
        saveToStorage()
    }
})

function createItem(value) {
    const li = document.createElement('li')
    li.innerText = value

    return li
}

function showList() {
    listElement.innerHTML = ''

    todos.forEach(todo => listElement.appendChild(createItem(todo)))
}

function loadFromStorage() {
    const data = localStorage.getItem('todo-list') || '[]'
    return JSON.parse(data)
}

function saveToStorage() {
    localStorage.setItem('todo-list', JSON.stringify(todos))
}