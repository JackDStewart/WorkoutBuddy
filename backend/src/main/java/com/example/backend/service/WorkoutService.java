package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.dto.WorkoutDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.User;
import com.example.backend.entity.Workout;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.WorkoutRepository;
import org.springframework.stereotype.Service;
import java.math.BigInteger;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class WorkoutService {


    private final UserRepository userRepository;

    private final WorkoutRepository workoutRepository;

    private final ExerciseRepository exerciseRepository;

    public WorkoutService(UserRepository userRepository, WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository) {
        this.userRepository = userRepository;
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
    }

    public List<Workout> getWorkoutsByUserAuth0Id(String userAuth0Id) {
        Optional<User> userOptional = userRepository.findById(new BigInteger(userAuth0Id));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return workoutRepository.findByUser(user);
        }
        throw new IllegalArgumentException("Workouts not found with Auth0 ID: " + userAuth0Id);
    }

    public WorkoutDTO toggleFavorite(Long workoutId) {
        // Fetch workout by ID
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        workout.setFavorite(!workout.isFavorite());
        workout = workoutRepository.save(workout);
        return new WorkoutDTO(workout);
    }


    public WorkoutDTO createWorkout(WorkoutDTO workoutDTO) {
        // Find the user by Auth0 ID
        BigInteger auth0idInt = new BigInteger(workoutDTO.getUserAuth0Id().substring(14));
        Optional<User> userOptional = userRepository.findById(auth0idInt);
        if (userOptional.isEmpty()) {
            throw new NoSuchElementException("create failed from Auth0 ID: " + auth0idInt);
        }
        User user = userOptional.get();

        Workout workout = new Workout();
        workout.setName(workoutDTO.getName());
        workout.setUser(user);
        workout.setFavorite(workoutDTO.isFavorite());

        // Map each ExerciseDTO to an existing Exercise entity
        Set<Exercise> exercises = workoutDTO.getExercises().stream()
                .map(dto -> exerciseRepository.findByName(dto.getName())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Exercise not found in database: " + dto.getName())))
                .collect(Collectors.toSet());

        workout.setExercises(exercises);

        // Save workout without attempting to save new exercises
        Workout savedWorkout = workoutRepository.save(workout);

        // Convert saved Workout entity back to WorkoutDTO
        Set<ExerciseDTO> exerciseDTOs = savedWorkout.getExercises().stream()
                .map(exercise -> new ExerciseDTO(
                        exercise.getName(),
                        exercise.getEquipment().getDisplayName(),
                        exercise.getMuscleGroup().getDisplayName(),
                        ""
                ))
                .collect(Collectors.toSet());

        return new WorkoutDTO(
                savedWorkout.getName(),
                savedWorkout.isFavorite(),
                exerciseDTOs
        );
    }

    public Workout getWorkoutById(Long workoutId) {
        Optional<Workout> workoutOptional = workoutRepository.findById(workoutId);
        if (workoutOptional.isPresent()) {
            return workoutOptional.get();
        }
        throw new IllegalArgumentException("Workout not found");
    }

}
