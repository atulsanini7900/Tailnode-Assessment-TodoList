import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';

const TodoForm = ({ onSubmit }) => {
  const [todoValue, setTodoValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todoValue);
    setTodoValue('');
  };

  return (
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
  );
};

export default TodoForm;
