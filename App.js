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

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  if (filter === currentFilter) {
    return <span> {children} </span>;
  }

  return (
    <a href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(filter);
    }}>
      {children}
    </a>
  )
}

const Footer = ({ visibilityFilter, onFilterClick }) => {
  return (
    <p> Show: {' '}
      <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterClick}>
        All
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} onClick={onFilterClick}>
        Active
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter} onClick={onFilterClick}>
        Completed
      </FilterLink>
    </p>
  )
}


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.completed);
  }
}

const Todo = ({ onClick, completed, text }) => {
  return (
    <li onClick={onClick}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      {text}
    </li>
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

const AddTodo = ({ onAddClick }) => {
  let input;

  return (
    <div>
      <input ref={(node) => input = node} />
      <button onClick={() => {
        onAddClick(input.value)
        input.value = '';
      }}>
        Add todo
      </button>
    </div>
  )
}

let todoID = 0;

const App = ({ todos, visibilityFilter }) => {
  return (
    <div>
      <AddTodo
        onAddClick={(text) => store.dispatch({
          type: 'ADD_TODO',
          id: todoID++,
          text
        })}/>

      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        onTodoClick={(id) => store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })}/>

        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={(filter) => {
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter
            })
          }}/>
    </div>
  );
}

export default App;
