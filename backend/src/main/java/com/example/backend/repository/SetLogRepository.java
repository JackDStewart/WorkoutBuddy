package com.example.backend.repository;

import com.example.backend.entity.SetLog;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface SetLogRepository extends CrudRepository<SetLog, Long> {

}
