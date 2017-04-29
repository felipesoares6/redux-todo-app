import React from 'react';
import { Component } from 'React';
import PropTypes from 'prop-types';

import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './containers/AddTodo';
import Footer from './components/Footer';

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
