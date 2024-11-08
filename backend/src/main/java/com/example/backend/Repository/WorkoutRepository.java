package com.example.backend.Repository;

import com.example.backend.Entity.Workout;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface WorkoutRepository extends CrudRepository<Workout, Long> {}
