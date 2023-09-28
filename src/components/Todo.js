import React, { useState, useEffect } from 'react';
import './style.css';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { trash } from 'react-icons-kit/feather/trash';
const getTodosFromLS = () => {
  const data = localStorage.getItem('Todos');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const Todo = () => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodos] = useState(getTodosFromLS());
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState();



  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };
    setTodos([...todos, todoObject]);
    setTodoValue('');
  };

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => todo.ID !== id);
    setTodos(filtered);
  };

  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.TodoValue);
    setId(index);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setEditForm(false);
    setTodoValue('');
  };

  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      setTodos(todoArray);
    });
  };

  return (
    <div style={{ backgroundColor: '#bcfc72', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      {/* form component */}
      {editForm === false && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <form autoComplete="off" onSubmit={handleSubmit} style={{ flexGrow: '1', display: 'flex' }}>
            <input
              type='text'
              placeholder="Add an Item"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
            />
            <div className='button'>
              <button
                type="submit"
                style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
              >
                <Icon icon={plus} size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
      {/* end of form component */}

      {/* edit form component */}
      {editForm === true && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <form autoComplete="off" onSubmit={handleEditSubmit} style={{ flexGrow: '1', display: 'flex' }}>
            <input
              type='text'
              placeholder="Edit your Item"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
            />
            <div className='button edit'>
              <button
                type="submit"
                style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      )}
      {/* end of edit form component */}

      {/* start of rendering todos depending on if we have length of todos greater than 0 */}
      {todos.length > 0 && (
        <>
          {todos
            .sort((a, b) => {
              if (a.completed && !b.completed) {
                return 1;
              } else if (!a.completed && b.completed) {
                return -1;
              } else {
                return 0;
              }
            })
            .map((individualTodo, index) => (
              <div className='todo' key={individualTodo.ID} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  {/* we dont need to show checkbox when edit button is clicked */}
                  {editForm === false && (
                    <input
                      type='checkbox'
                      checked={individualTodo.completed}
                      onChange={() => handleCheckbox(individualTodo.ID)}
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  <span style={{ flex: '1', fontSize: '16px', textDecoration: individualTodo.completed === true ? 'line-through' : 'none' }}>
                    {individualTodo.TodoValue}
                  </span>
                </div>

                {/* we dont need to show edit and delete icons when edit button is clicked */}
                {editForm === false && (
                  <div className='edit-and-delete' style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <div style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleEdit(individualTodo, index)}>
                      <Icon icon={edit2} size={18} />
                    </div>
                    <div style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleDelete(individualTodo.ID)}>
                      <Icon icon={trash} size={18} />
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* delete all todos */}
          {editForm === false && (
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
        </>
      )}
      {/* end of rendering todos depending on if we have length of todos greater than 0 */}
    </div>
  );
};

export default Todo;
