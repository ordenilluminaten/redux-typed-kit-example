import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import TodoItem from './components/todo';
import CreateTodoModal from './components/create-todo-modal';
import Header from './components/header';

import TodosSelector from './selectors/todos-selector';

import AppState from './models/states/app-state';
import { Unsubscribe } from 'redux';

import store from './store';

import './index.less';

@Component
export default class extends Vue {
  public state: AppState = store.state;
  public todoText: string;

  private selector: TodosSelector = new TodosSelector();
  private unsubscribe: Unsubscribe;

  created() {
    this.unsubscribe = store.subscribe(() => {
      this.state = store.state;
    });
  }

  beforeDestroy() {
    this.unsubscribe();
  }

  render() {
    return <div class="todo-app">
      <Header state={this.state.filterState}></Header>
      <main>
        {
          this.selector.getFilteredTodos(this.state)
            .map(x => <TodoItem todoItem={x}></TodoItem>)
        }
      </main>
      <footer>
        Completed todos {this.selector.getCompletedCount(this.state.todosState)} of {this.state.todosState.todos.length}
      </footer>
      <CreateTodoModal
        shown={this.state.todosState.createModalState.isShown}
        state={this.state.todosState.createModalState}></CreateTodoModal>
    </div>;
  }
}