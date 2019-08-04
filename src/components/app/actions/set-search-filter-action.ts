
import { Action } from 'redux-typed-kit';

export default class SetSearchFilterAction extends Action {
    constructor(public search: string) {
        super();
    }

    public meta: any = {
        debounce: {
            time: 300
        }
    };
}