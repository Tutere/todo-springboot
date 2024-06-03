import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Button } from "react-bootstrap";

interface IProps {
    setTask: React.Dispatch<React.SetStateAction<ITask[]>>
}

const InputComponent: React.FC<IProps> = ({setTask}) => {
    const [newTaskInput, setNewTaskInput] = useState<string>("")

    const handleKeyPress = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (event.key == 'Enter') {
            addTask()
            setNewTaskInput('')
        }
    }

    const addTask = () => {
        const options = {
            method: 'POST',
            body: newTaskInput,
        }

        fetch(`${API_BASE_URL}/tasks`, options)
        .then(response => response.json())
        .then(newTask => setTask(prevState => [...prevState,newTask]))
        .catch(error => {
            console.log(error)
            alert("couldn't add task")
        })
    }

    return (
        <div className={"add-task-item"}>
            <span>New Task: </span>
            <input type="text" 
                value={newTaskInput} 
                onChange={event => setNewTaskInput(event?.target.value)}
                onKeyDown={handleKeyPress}
            />
            <Button onClick={addTask}> Add Task</Button>
        </div>
    )
}

export default InputComponent;