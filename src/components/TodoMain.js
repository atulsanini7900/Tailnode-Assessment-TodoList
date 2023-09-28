import React, { useState, useEffect } from 'react';
import './style.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const getTodosFromLS = () => {
  const data = localStorage.getItem('Todos');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const TodoMain = () => {
  const [todos, setTodos] = useState(getTodosFromLS());
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState();

  const handleAddTodo = (todoValue) => {
    const date = new Date();
    const time = date.getTime();
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };
    setTodos([...todos, todoObject]);
  };

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => todo.ID !== id);
    setTodos(filtered);
  };

  const handleEdit = (todo, index) => {
    setEditForm(true);
    setId(index);
  };

  const handleEditSubmit = (todoValue) => {
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setEditForm(false);
  };

  const handleCheckboxChange = (id, index) => {
    let updatedTodos = [...todos];
    const todoToToggle = updatedTodos[index];
    todoToToggle.completed = !todoToToggle.completed;
    updatedTodos.splice(index, 1); // Remove the TODO from its current position
    updatedTodos.push(todoToToggle); // Add the TODO to the end
    setTodos(updatedTodos);
  };
  

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div style={{ backgroundColor: '#bcfc72', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <TodoForm onSubmit={handleAddTodo} />

      {editForm && (
        <TodoForm onSubmit={handleEditSubmit} />
      )}

      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCheckboxChange={handleCheckboxChange}
      />

      {todos.length > 0 && !editForm && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className='delete-all'
            onClick={() => setTodos([])}
            style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', marginTop: '10px' }}
          >
            Delete All Items
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoMain;
