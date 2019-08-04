import { State } from 'redux-typed-kit';
import TodosState from './todos-state';
import FilterState from './filter-state';

export default class AppState extends State {
    public todosState: TodosState;
    public filterState: FilterState;
}