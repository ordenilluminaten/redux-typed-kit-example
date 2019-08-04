import TodosReducer from './todos-reducer';
import { RootReducer } from 'redux-typed-kit';
import FilterReducer from './filter-reducer';

const rootReducer = new RootReducer(new TodosReducer(), new FilterReducer());
export default rootReducer;