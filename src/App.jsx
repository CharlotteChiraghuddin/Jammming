import React, { useState, useEffect } from 'react';
import "./style.css";
import NewTodoForm from './newTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null)return []

    return JSON.parse(localValue);
  });

  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo; // Ensure other todos are returned unchanged
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm setTodos={setTodos} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      
    </>
  );
}

export default App;
