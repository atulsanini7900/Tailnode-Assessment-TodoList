import React from 'react';
import { Icon } from 'react-icons-kit';
// import { edit2 } from 'react-icons-kit/feather/edit2';
import { trash } from 'react-icons-kit/feather/trash';

const TodoItem = ({ todo, index, onEdit, onDelete, onCheckboxChange }) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(todo.ID, index);
  };

  return (
    <div className='todo' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <div>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: '10px' }}
        />
        <span style={{ flex: '1', fontSize: '16px', textDecoration: todo.completed === true ? 'line-through' : 'none' }}>
          {todo.TodoValue}
        </span>
      </div>

      <div className='edit-and-delete' style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
        {/* <div style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => onEdit(todo)}>
          <Icon icon={edit2} size={18} />
        </div> */}
        <div style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => onDelete(todo.ID)}>
          <Icon icon={trash} size={18} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
