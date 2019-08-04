import { Reducer, ActionHandler } from 'redux-typed-kit';
import FilterState from '../models/states/filter-state';
import SetSearchFilterAction from '../actions/set-search-filter-action';
import SetStatusFilterAction from '../actions/set-status-filter-action copy';

export default class FilterReducer extends Reducer<FilterState> {
    initialState = new FilterState();
    name = "filterState";

    @ActionHandler
    setSearch(state: FilterState, action: SetSearchFilterAction): FilterState {
        return state.rebuild(x => {
            x.search = action.search;
        });
    }

    @ActionHandler
    setStatus(state: FilterState, action: SetStatusFilterAction): FilterState {
        return state.rebuild(x => {
            x.status = action.status;
        });
    }
}