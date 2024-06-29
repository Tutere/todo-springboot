import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Button, Col, Row } from "react-bootstrap";
import { addTask } from "../store/tasks";
import { useAppDispatch } from "../store/root";


const InputComponent: React.FC = () => {
    const [newTaskInput, setNewTaskInput] = useState<string>("")
    const dispatch = useAppDispatch()

    const handleKeyPress = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (event.key == 'Enter') {
            handleAddTask()
            setNewTaskInput('')
        }
    }

    const handleAddTask = () => {
        const options = {
            method: 'POST',
            body: newTaskInput,
        }

        fetch(`${API_BASE_URL}/tasks`, options)
        .then(response => response.json())
        .then(newTask => dispatch(addTask(newTask)))
        .catch(error => {
            console.log(error)
            alert("couldn't add task")
        })
        setNewTaskInput('')
    }

    return (
        <Row className="add-task-item mt-m-5 mb-5"> 
            <Col md={10}>
                <input 
                    className="w-100"
                    type="text" 
                    placeholder="New Task"
                    value={newTaskInput} 
                    onChange={event => setNewTaskInput(event?.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </Col>
            <Col md={2}>
                <Button onClick={handleAddTask}> Add Task</Button>
            </Col>
            
        </Row>
    )
}

export default InputComponent;