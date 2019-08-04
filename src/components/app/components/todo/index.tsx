import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Checkbox, Button, Popconfirm } from 'ant-design-vue';

import TodoItem from '../../models/todo-item';
import ToggleTodoAction from '../../actions/toggle-todo-action';
import RemoveTodoAction from '../../actions/remove-todo-action';
import { TodoStatus } from '../../models/todo-status';

import store from '../../store';

import './index.less';

@Component
export default class extends Vue {
  @Prop() public todoItem: TodoItem;

  private toggle() {
    store.dispatch(new ToggleTodoAction(this.todoItem.id));
  }

  private remove() {
    store.dispatch(new RemoveTodoAction(this.todoItem.id));
  }

  render() {
    return <div class={`todo-item ${this.todoItem.status == TodoStatus.completed ? 'completed' : 'active'}`}>
      <Checkbox checked={this.todoItem.status == TodoStatus.completed} on-change={this.toggle}>{this.todoItem.text}</Checkbox>
      <Popconfirm title="Are you sure delete this task?" on-confirm={this.remove}>
        <Button icon="delete"></Button>
      </Popconfirm>
    </div>;
  }
}