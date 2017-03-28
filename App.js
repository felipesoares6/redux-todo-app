import React from 'react';
import { Component } from 'React';
import { createStore, combineReducers } from 'redux';


const todos = (state = [], action) => {
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

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        isCompleted: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, { isCompleted: !state.isCompleted })
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({ todos, visibilityFilter });

export const store = createStore(todoApp);

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return <span> {children} </span>;
  }

  return (
    <a href="#"
      onClick={(e) => {
        e.preventDefault()
        store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter });
    }}>
      {children}
    </a>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => todo.isCompleted);
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.isCompleted);
    default:
  }
}

let todoID = 0;

class App extends Component {
  render () {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return (
      <div>
        <input ref={(node) => this.input = node} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: todoID++
          });
          this.input.value = '';
        }}>
          Add todo
        </button>

        <ul>
          { visibleTodos.map((todo) =>
              <li key={todo.id}
                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                onClick={ () => store.dispatch({ type: 'TOGGLE_TODO', id: todo.id }) }>
                {todo.text}
              </li>
            )
          }
        </ul>

        <p> Show: {' '}
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
            All
          </FilterLink>
          {', '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {', '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default App;
