
import './App.css';
// import Todo from './components/Todo';
import TodoMain from './components/TodoMain';

function App() {
  return (
    <div className="wrapper">
      <h3>TODOAPP USING REACT HOOKS AND LOCALSTORAGE</h3>
      <div className="form-and-todo-box">
      <TodoMain/>
      </div>
    </div>
  );
}

export default App;
