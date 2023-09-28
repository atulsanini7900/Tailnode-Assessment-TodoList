
import './App.css';
import Todo from './components/Todo';

function App() {
  return (
    <div className="wrapper">
      <h3>TODOAPP USING REACT HOOKS AND LOCALSTORAGE</h3>
      <div className="form-and-todo-box">
       <Todo/>
      </div>
    </div>
  );
}

export default App;
