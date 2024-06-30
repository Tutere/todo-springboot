import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Container } from "react-bootstrap";
import TaskComponent from "./TaskComponent";
import { useAppStore } from "../store/root";


const TaskListComponent: React.FC = () => {
    const store =  useAppStore()
    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect( () => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState()
            setTasks(state.tasks)
        })
        return unsubscribe //teardown
    },[store])

    return (
        
       <Container> 
            <hr></hr>
            <h2 className="display-4">Tasks</h2>
            {tasks.map(task => <TaskComponent task={task} />)} 
       </Container>
    )
}

export default TaskListComponent;