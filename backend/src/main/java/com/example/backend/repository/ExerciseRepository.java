package com.example.backend.repository;

import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.Exercise;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
    Optional<Exercise> findByName(String name);
    Optional<Exercise> findByEquipment(Equipment equipment);
}