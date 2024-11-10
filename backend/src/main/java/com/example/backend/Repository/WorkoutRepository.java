package com.example.backend.Repository;

import com.example.backend.Entity.User;
import com.example.backend.Entity.Workout;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface WorkoutRepository extends CrudRepository<Workout, Long> {
    List<Workout> findByUser(User user);
}
