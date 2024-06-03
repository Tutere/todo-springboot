import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Button, Col, Container, Row } from "react-bootstrap";
import { resolve } from "path";

interface IProps {
    task: ITask
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const TaskComponent: React.FC<IProps> = ({task, setTasks}) => {
    const markAsDone = () => {
        const updatedTask: ITask = {...task, done:true}

        const options = {
            method: 'PUT',
            body: JSON.stringify(updatedTask)
        }

        fetch(`${API_BASE_URL}/tasks/${task.id}`,options)
            .then(response => response.json())
            .then(updatedTask => 
                setTasks(prevState => prevState.map(item => item.id === task.id ? updatedTask : item)))
            .catch(error => {
                console.log(error)
                alert("couldn't update task")
            })
    }

    const deleteTask = () => {
        const options ={method: 'DELETE'}

        fetch(`${API_BASE_URL}/tasks/${task.id}`,options)
            .then(response => {
                if (response.ok) {
                    setTasks(prevState => prevState.filter(item => item.id !== task.id)) //if item does not meet criteria then is excluded from the list 
                }
            })
            .catch(error => {
                console.log(error)
                alert("couldn't delete task")
            })
    }

    return (
      <Row>
        <Col md={2}>
            <input type="checkbox" checked={task.done} onChange={markAsDone}/>
        </Col>
        <Col md={8}>
            <span>{task.content}</span>
        </Col>
        <Col md={2}>
            <Button onClick={deleteTask}>
                X
            </Button>
        </Col>
      </Row>
    )
}

export default TaskComponent;