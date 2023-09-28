import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete, onCheckboxChange }) => {
  return (
    <div>
      {todos.map((individualTodo, index) => (
        <TodoItem
          key={individualTodo.ID}
          todo={individualTodo}
          onEdit={onEdit}
          onDelete={onDelete}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
};

export default TodoList;
