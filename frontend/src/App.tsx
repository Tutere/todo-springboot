
import { useState } from 'react';
import './App.css';
import InputComponent from './components/inputComponent';

interface ITask {
  id: number
  content: string
  done: boolean
}

const App: React.FC =() => {
  const [tasks, setTask] = useState<ITask[]>([])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <InputComponent />
      </main>
    </div>
  );
}

export default App;
