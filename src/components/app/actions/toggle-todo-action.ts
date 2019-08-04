
import { Action } from 'redux-typed-kit';

export default class ToggleTodoAction extends Action {
    constructor(public todoId: number) {
        super();
    }
}   