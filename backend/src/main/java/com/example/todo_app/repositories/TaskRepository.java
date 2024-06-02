package com.example.todo_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todo_app.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
