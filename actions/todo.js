let todoID = 0;

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: todoID++,
    text
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
