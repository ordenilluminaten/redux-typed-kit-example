import { Reducer, ActionHandler as Action } from 'redux-typed-kit';
import TodosState from '../models/states/todos-state';

import { AddTodoAction, AddTodoStartAction, AddTodoCancelAction, AddTodoSuccessAction, AddTodoFailureAction } from '../actions/add-todo-action';
import RemoveTodoAction from '../actions/remove-todo-action';
import ToggleTodoAction from '../actions/toggle-todo-action';
import TodoItem from '../models/todo-item';
import { TodoStatus } from '../models/todo-status';

export default class TodosReducer extends Reducer<TodosState> {
    initialState = new TodosState();
    name = "todosState";

    @Action
    addTodoStart(state: TodosState, action: AddTodoStartAction): TodosState {
        return state.rebuild(x => {
            x.createModalState = x.createModalState.rebuild(y => {
                y.isShown = true;
            });
        });
    }

    @Action
    addTodoCancel(state: TodosState, action: AddTodoCancelAction): TodosState {
        return state.rebuild(x => {
            x.createModalState = x.createModalState.rebuild(y => {
                y.isShown = false;
            });
        });
    }

    @Action
    addTodo(state: TodosState, action: AddTodoAction): TodosState {
        return state.rebuild(x => {
            x.createModalState = x.createModalState.rebuild(y => {
                y.isCreating = true;
            });
        });
    }

    @Action
    addTodoSuccess(state: TodosState, action: AddTodoSuccessAction): TodosState {
        return state.rebuild(x => {
            // const item = new TodoItem(state.todos.length + 1, action.text);
            x.todos = [...x.todos, action.item];
            x.createModalState = x.createModalState.rebuild(y => {
                y.isCreating = false;
                y.isShown = false;
            });
        });
    }

    @Action
    addTodoFailure(state: TodosState, action: AddTodoFailureAction): TodosState {
        return state.rebuild(x => {
            x.createModalState = x.createModalState.rebuild(y => {
                y.isCreating = false;
                y.error = action.error;
            });
        });
    }

    @Action
    test1(state: TodosState, action: RemoveTodoAction): TodosState {
        return state.rebuild(x => {
            x.todos = x.todos.filter(x => x.id != action.todoId);
        });
    }

    @Action
    testSuccess(state: TodosState, action: ToggleTodoAction): TodosState {
        return state.rebuild(x => {
            x.todos = x.todos.map(x => {
                if (x.id == action.todoId)
                    return new TodoItem(x.id, x.text,
                        x.status == TodoStatus.active ? TodoStatus.completed : TodoStatus.active);
                return x;
            });
        });
    }
}