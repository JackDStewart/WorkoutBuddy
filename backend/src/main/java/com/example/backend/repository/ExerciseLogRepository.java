package com.example.backend.repository;

import com.example.backend.entity.ExerciseLog;
import com.example.backend.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ExerciseLogRepository extends CrudRepository<ExerciseLog, Long> {
    List<ExerciseLog> findByUser(User user);
}