import { Todo } from '../../types/entities'

export const incAction = () => ({ type: 'inc' })
export const decAction = () => ({ type: 'dec' })


export const setSelectedTodo = (todo: Todo) => ({ type: 'setSelectedTodo', todo })
export const setAllTodos = (allTodos: Todo[]) => ({ type: 'setAllTodos', allTodos })