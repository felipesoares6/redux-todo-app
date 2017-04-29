import React from 'react';
import { Component } from 'React';
import PropTypes from 'prop-types';
import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './containers/AddTodo';
import Footer from './components/Footer';

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
