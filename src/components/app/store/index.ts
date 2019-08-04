import { Store } from 'redux-typed-kit';
import AppState from '../models/states/app-state';
import rootReducer from '../reducers';
import TodosMiddleware from '../middlewares/todos-middleware';
import LoggerMiddleware from '../middlewares/logger-middleware';
// @ts-ignore
import createDebounce from 'redux-debounced'

const store = new Store<AppState>(rootReducer, createDebounce(), new TodosMiddleware(), new LoggerMiddleware());
export default store.init();