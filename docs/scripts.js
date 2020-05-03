const listElement = document.querySelector('#todos ul')
const addTodoInput = document.querySelector('#new-todo input')
const addTodoButton = document.querySelector('#new-todo button')

addTodoButton.addEventListener('click', () => {
    if(addTodoInput.value !== '') {
        listElement.appendChild(createItem(addTodoInput.value))
        addTodoInput.value = ''
    }
})

function createItem(value) {
    const li = document.createElement('li')
    li.innerText = value

    return li
}