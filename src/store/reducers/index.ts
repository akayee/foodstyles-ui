import { Todo } from '../../types/entities'

type State = {
    counter: number
    selectedTodo: Todo
    allTodos: Todo[]
}

const initialState: State = {
    counter: 0,
    selectedTodo: {} as Todo,
    allTodos: [] as Todo[]
}

export default (state = initialState, action: any): State => {
    switch (action.type) {
        case 'inc':
            return { ...state, counter: state.counter + 1 }
        case 'dec':
            return { ...state, counter: state.counter - 1 }
        case 'setSelectedTodo':
            return { ...state, selectedTodo: action.todo }
            case 'setAllTodos':
                return { ...state, allTodos: action.allTodos }
        default:
            return state
    }
}
