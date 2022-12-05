
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}, importance: ${todo.importance} ,ToDo Was Create At: ${todo.createdAt}
        <button title="to delete" onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
    document.querySelector('.done-todos').innerText = getDoneTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxtInput2 = document.querySelector('input[name="todo-importance"]')
    const importance = elTxtInput2.value
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (txt === '' && importance|| importance > 3) return
    // console.log('txt', txt)
    addTodo(txt, importance)
    elTxtInput2.value = ''
    elTxt.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSortBy(sortBy) {
    sort(sortBy)
    renderTodos()
}


