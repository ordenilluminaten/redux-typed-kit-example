import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import store from '../../store';

import { Modal, Button, Input } from 'ant-design-vue';

import './index.less';
import { AddTodoCancelAction, AddTodoAction } from '../../actions/add-todo-action';
import CreateModalState from '../../models/states/create-modal-state';
@Component
export default class extends Vue {
  @Prop() public shown: boolean;
  @Prop() public state: CreateModalState;

  public text: string = '';

  private cancelAddTodo() {
    store.dispatch(new AddTodoCancelAction());
  }

  private addTodo() {
    store.dispatch(new AddTodoAction(this.text));
  }

  @Watch('shown')
  private onShownChanged(isShowm) {
    if (!isShowm)
      this.text = '';
  }

  render() {
    return <Modal
      title="Creating todo"
      visible={this.shown}
      on-cancel={this.cancelAddTodo}>

      <Input placeholder="Todo description" v-model={this.text}></Input>

      <template slot="footer">
        <Button key="back" on-click={this.cancelAddTodo}>Cancel</Button>
        <Button key="submit" type="primary" loading={this.state.isCreating} on-click={this.addTodo}>
          Submit
        </Button>
      </template>
    </Modal>;
  }
}