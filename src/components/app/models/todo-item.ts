import { TodoStatus } from './todo-status';

export default class TodoItem {
    constructor(public id: number,
        public text: string,
        public status: TodoStatus = TodoStatus.active) {
    }
}