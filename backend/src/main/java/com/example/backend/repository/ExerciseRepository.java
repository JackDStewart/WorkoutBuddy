package com.example.backend.repository;

import com.example.backend.entity.Exercise;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
    Optional<Exercise> findByName(String name);

    @Query("SELECT e FROM Exercise e WHERE e.createdBy IS NULL OR e.createdBy.id = :userId")
    List<Exercise> findByCreatedByIsNullOrUserId(@Param("userId") BigInteger userId);
}