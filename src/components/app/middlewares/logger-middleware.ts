import { PostMiddlewareHandler, PreMiddlewareHandler, Middleware, Store } from 'redux-typed-kit';
import AppState from '../models/states/app-state';

export default class LoggerMiddleware extends Middleware<AppState> {

    @PreMiddlewareHandler
    preLog(store: Store<AppState>, action: any) {
        console.log('pre', action, JSON.parse(JSON.stringify(store.getState())));
    }

    @PostMiddlewareHandler
    postLog(store: Store<AppState>, action: any, prevState: AppState) {
        console.log('post', action, JSON.parse(JSON.stringify(store.getState())));
    }
}