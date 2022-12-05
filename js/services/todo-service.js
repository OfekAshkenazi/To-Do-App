const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'importance'
_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    var earseOrNot = confirm('are you sure?')
    if (earseOrNot) {
        const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
        gTodos.splice(todoIdx, 1)
        saveToStorage(STORAGE_KEY, gTodos)
    } else return 

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    if (gTodos.length === 0) return 'No Todos'
    return gTodos.length
}

function getDoneTodos() {
    if (gTodos.length === 0) return ' No Done Todos'
    return gTodos.filter(todo => todo.isDone).length
}

function getActiveTodos() {
    if (gTodos.length === 0) return 'No Active Todos'
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            // _createTodo('Learn HTML', 1),
            // _createTodo('Study CSS', 1),
            // _createTodo('Master JS', 1),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date(),
        importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function sort(sortBy) {
    console.log(sortBy)
    if(sortBy === 'txt') gTodos.sort((todo1,todo2) => todo1.txt.localCompre(todo2.txt)) 
    else if (sortBy === 'created')  gTodos.sort((todo1, todo2) => Date.parse(todo1.createdAt) - Date.parse(todo2.createdAt))
    else gTodos.sort((todo1,todo2) => todo1.importance- todo2.importance) 
}

