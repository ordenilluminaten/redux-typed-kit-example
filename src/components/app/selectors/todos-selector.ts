import TodosState from '../models/states/todos-state';
import AppState from '../models/states/app-state';
import { TodoStatus } from '../models/todo-status';

export default class TodosSelector {
    getFilteredTodos(state: AppState) {
        const filter = state.filterState;
        return state.todosState.todos.filter(x => {
            if (filter.search != null && filter.search.length > 0) {
                if (!x.text.toLowerCase().includes(filter.search.toLowerCase()))
                    return false;
            }
            if (filter.status != null) {
                if (x.status != filter.status)
                    return false;
            }
            return true;
        });
    }

    getCompletedCount(state: TodosState): number {
        return state.todos.filter(x => x.status == TodoStatus.completed).length;
    }
}