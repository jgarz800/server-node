import { nanoid } from 'nanoid'

const todos = []

const baseTodo = {
    id: nanoid(),
    text: 'Test to do item',
    completed: false,
}

todos.push(baseTodo)

export const getTodos = () => {
    return todos
}

export const addTodo = (todo) => {
    todos.push(todo)
}


