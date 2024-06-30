import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_BASE_URL } from "../config";
import { response } from "express";
import { ITask } from "../App";
import { Button, Col, Container, Row } from "react-bootstrap";
import { resolve } from "path";
import { deleteTask, updateTask } from "../store/tasks";
import { useAppDispatch } from "../store/root";

interface IProps {
    task: ITask
}

const TaskComponent: React.FC<IProps> = ({task}) => {
    const dispatch = useAppDispatch()
    
    const handleToggleStatus = () => {
        const updatedTask: ITask = {...task, done:!task.done}

        const options = {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
            headers : {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${API_BASE_URL}/tasks/${task.id}`,options)
            .then(response => response.json())
            .then(updatedTask => dispatch(updateTask(updatedTask)))
            .catch(error => {
                console.log(error)
                alert("couldn't update task")
            })
    }

    const handleDeleteTask = () => {
        const options ={method: 'DELETE'}

        fetch(`${API_BASE_URL}/tasks/${task.id}`,options)
            .then(response => {
                if (response.ok) {
                    dispatch(deleteTask(task))
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
            <input type="checkbox" checked={task.done} onChange={handleToggleStatus}/>
        </Col>
        <Col md={8}>
            <span>{task.content}</span>
        </Col>
        <Col md={2}>
            <Button onClick={handleDeleteTask}>
                X
            </Button>
        </Col>
      </Row>
    )
}

export default TaskComponent;