
import { useEffect, useState } from 'react';
import './App.css';
import InputComponent from './components/inputComponent';
import TaskListComponent from './components/TaskListComponent';
import { API_BASE_URL } from './config';
import { Container } from 'react-bootstrap';
import { addTask } from './store/tasks';
import { useAppDispatch } from './store/root';

export interface ITask {
  id: number
  content: string
  done: boolean
}

const App: React.FC =() => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const options = {method: 'GET'}

    fetch(`${API_BASE_URL}/tasks`, options)
      .then(response => response.json())
      .then(fetchedTasks => fetchedTasks.forEach((task: ITask) => dispatch(addTask(task))))
      .catch(error => {
        console.log(error)
        alert("Couldn't fetch tasks")
      })
  }, [])

  return (
    <div className="App">
      <main>
        <Container>
          <h1 className="display-1 text-center">Todo App</h1>
          <InputComponent/>
          <TaskListComponent/>
        </Container>
      </main>
    </div>
  );
}

export default App;
