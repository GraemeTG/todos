import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  //const [todos, setTodos] = useState(['Todo 1', 'Todo 2'])
  //const [todos, setTodos] = useState([{ id: 1, name: 'Todo 1', complete: false }])
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
    


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    // setTodos([]) // clear all of our todos option
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <h2>My VITAL DGT ToDos</h2>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
     </>
    )   
}

export default App;
