package com.example.backend.Repository;

import com.example.backend.Entity.Enum.Equipment;
import com.example.backend.Entity.Exercise;
import com.example.backend.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
    Optional<Exercise> findByName(String name);
    Optional<Exercise> findByEquipment(Equipment equipment);
}