import { useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";

interface IProps {
    setTask: React.Dispatch<React.SetStateAction<ITask[]>>
}

const InputComponent: React.FC<IProps> = ({setTask}) => {
    const [newTaskInput, setNewTaskInput] = useState<string>("")

    const addTask = () => {
        const options = {
            method: 'POST',
            body: newTaskInput,
        }

        fetch(`${API_BASE_URL}/tasks`, options)
        .then(response => response.json())
        .then()
        .catch()
    }

    return (
        <div className={"add-task-item"}>
            <span>New Task: </span>
            <input type="text" 
                value={newTaskInput} 
                onChange={event => setNewTaskInput(event?.target.value)}
            />
        </div>
    )
}

export default InputComponent;