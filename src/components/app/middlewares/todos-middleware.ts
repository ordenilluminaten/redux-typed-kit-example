import { PostMiddlewareHandler, PreMiddlewareHandler, Middleware, Store } from 'redux-typed-kit';
import AppState from '../models/states/app-state';
import { AddTodoAction, AddTodoSuccessAction } from '../actions/add-todo-action';
import TodoItem from '../models/todo-item';

export default class TodosMiddleware extends Middleware<AppState> {

    @PostMiddlewareHandler
    addTodo(store: Store<AppState>, action: AddTodoAction) {
        const state = store.getState();
        // simulate async server request
        setTimeout(() => {
            // item from server's response
            const todoItem = new TodoItem(state.todosState.todos.length + 1, action.text);
            store.dispatch(new AddTodoSuccessAction(todoItem));
        }, 500);
    }
}