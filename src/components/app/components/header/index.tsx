import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Input, Button, Popover, Radio } from 'ant-design-vue';

import FilterState from '../../models/states/filter-state';
import { TodoStatus } from '../../models/todo-status';

import SetSearchFilterAction from '../../actions/set-search-filter-action';
import SetStatusFilterAction from '../../actions/set-status-filter-action copy';
import { AddTodoStartAction } from '../../actions/add-todo-action';

import store from '../../store';
import './index.less';

@Component
export default class extends Vue {
  @Prop() public state: FilterState;

  public search: string = '';
  public status: TodoStatus | null = null;

  @Watch('search')
  private onSearchChange() {
    store.dispatch(new SetSearchFilterAction(this.search));
  }

  @Watch('status')
  private onStatusChange() {
    store.dispatch(new SetStatusFilterAction(this.status));
  }

  private addTodo() {
    store.dispatch(new AddTodoStartAction());
  }

  render() {
    return <header>
      <Button type="primary" icon="plus" style="margin-right: 10px" on-click={this.addTodo}>Add todo</Button>
      <Input placeholder="Search todos" v-model={this.search} style="margin-right: 10px"></Input>
      <Popover title="Advanced filters" placement="bottom">
        <template slot="content">
          <label>
            Status:&nbsp;
            <Radio.Group defaultValue={null} size="small" v-model={this.status}>
              <Radio.Button value={null}>All</Radio.Button>
              <Radio.Button value={TodoStatus.active}>Active</Radio.Button>
              <Radio.Button value={TodoStatus.completed}>Completed</Radio.Button>
            </Radio.Group>
          </label>
        </template>
        <Button icon="filter"></Button>
      </Popover>
    </header>;
  }
}