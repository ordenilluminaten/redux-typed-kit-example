
import { Action } from 'redux-typed-kit';
import { TodoStatus } from '../models/todo-status';

export default class SetStatusFilterAction extends Action {
    constructor(public status: TodoStatus | null) {
        super();
    }
}