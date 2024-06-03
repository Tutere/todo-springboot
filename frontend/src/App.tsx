
import { useEffect, useState } from 'react';
import './App.css';
import InputComponent from './components/inputComponent';
import TaskListComponent from './components/TaskListComponent';
import { API_BASE_URL } from './config';

export interface ITask {
  id: number
  content: string
  done: boolean
}

const App: React.FC =() => {
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    const options = {method: 'GET'}

    fetch(`${API_BASE_URL}/tasks`, options)
      .then(response => response.json())
      .then(fetchedTasks => setTasks(fetchedTasks))
      .catch(error => {
        console.log(error)
        alert("Couldn't fetch tasks")
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <InputComponent setTask={setTasks}/>
        <TaskListComponent tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
}

export default App;
