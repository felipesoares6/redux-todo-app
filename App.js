import React from 'react';
import { Component } from 'React';
import PropTypes from 'prop-types';

import VisibleTodoList from './containers/VisibleTodoList';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, { completed: !state.completed })
    default:
      return state;
  }
}

export const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
}

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span> {children} </span>;
  }

  return (
    <a href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
    }}>
      {children}
    </a>
  )
}

class FilterLink extends Component {
  componentDidMount () {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link
        active={ props.filter === store.visibilityFilter }
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}
      >
        {this.props.children}
      </Link>

    )
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
}

const Footer = () => {
  return (
    <p> Show: {' '}
      <FilterLink filter="SHOW_ALL">
        All
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_COMPLETED">
        Completed
      </FilterLink>
    </p>
  )
}

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map((todo) =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}/>
      )}
    </ul>
  )
}

let todoID = 0;

const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />

      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: todoID++,
          text: input.value
        })
        input.value = '';
      }}>
    Add Todo
  </button>
</div>
  )
}

AddTodo.contextTypes = {
  store: PropTypes.object
}

const App = () => {
  return (
    <div>
      <AddTodo />

      <VisibleTodoList />

      <Footer />
    </div>
  )
}

export default App;
