package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.User;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository, UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }

    public List<Exercise> getAllExercises() {
        return (List<Exercise>) exerciseRepository.findAll();
    }

    public List<Exercise> getExercisesByUserIdOrNull(String userId) {
        BigInteger userIdLong = new BigInteger(userId);
        return exerciseRepository.findByCreatedByIsNullOrUserId(userIdLong);
    }

    public Exercise createExercise(ExerciseDTO exerciseDTO) {
        Exercise newExercise = new Exercise();
        newExercise.setName(exerciseDTO.getName());
        newExercise.setEquipment(exerciseDTO.getEquipment());
        newExercise.setMuscleGroup(exerciseDTO.getMuscleGroup());

        Optional<User> userOptional = userRepository.findById(new BigInteger(exerciseDTO.getUserAuth0Id().substring(14)));
        if (userOptional.isEmpty()) {
            throw new NoSuchElementException("create failed from Auth0 ID: " + exerciseDTO.getUserAuth0Id());
        }
        User user = userOptional.get();

        newExercise.setCreatedBy(user);
        return exerciseRepository.save(newExercise);
    }
}

