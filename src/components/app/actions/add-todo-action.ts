import { Action } from 'redux-typed-kit'
import TodoItem from '../models/todo-item';

export class AddTodoStartAction extends Action {
    constructor() {
        super();
    }
}

export class AddTodoCancelAction extends Action {
    constructor() {
        super();
    }
}

export class AddTodoAction extends Action {
    constructor(public text: string) {
        super();
    }
}

export class AddTodoSuccessAction extends Action {
    constructor(public item: TodoItem) {
        super();
    }
}

export class AddTodoFailureAction extends Action {
    constructor(public error: string) {
        super();
    }
}