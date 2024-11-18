package com.example.backend.repository;

import com.example.backend.entity.User;
import com.example.backend.entity.Workout;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface WorkoutRepository extends CrudRepository<Workout, Long> {
    List<Workout> findByUser(User user);
}
