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

export const store = createStore(todos);

let todoID = 0;

class App extends Component {
  render () {
    const { todos } = this.props;

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
          { todos.map((todo) =>
              <li key={todo.id}
                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                onClick={ () => store.dispatch({ type: 'TOGGLE_TODO', id: todo.id }) }>
                {todo.text}
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
