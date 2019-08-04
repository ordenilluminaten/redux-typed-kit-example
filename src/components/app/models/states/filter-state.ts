import { State } from 'redux-typed-kit';
import { TodoStatus } from '../todo-status';

export default class FilterState extends State {
    public search: string;
    public status: TodoStatus | null;
}