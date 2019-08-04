import { State } from 'redux-typed-kit';
import TodoItem from '../todo-item';
import CreateModalState from './create-modal-state';

export default class TodosState extends State {
    public todos: Array<TodoItem> = [];
    public createModalState: CreateModalState = new CreateModalState();
}