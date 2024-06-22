import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Container } from "react-bootstrap";
import TaskComponent from "./TaskComponent";

interface IProps {
    tasks: ITask[]
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const TaskListComponent: React.FC<IProps> = ({tasks, setTasks}) => {
    //map uses return value whereas foreach wouldnt?
    return (
        
       <Container> 
            <hr></hr>
            <h2 className="display-4">Tasks</h2>
            {tasks.map(task => <TaskComponent task={task} setTasks={setTasks}></TaskComponent>)} 
       </Container>
    )
}

export default TaskListComponent;