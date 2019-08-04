import { Action } from 'redux-typed-kit';

export default class RemoveTodoAction extends Action {
    constructor(public todoId: number) {
        super();
    }
}