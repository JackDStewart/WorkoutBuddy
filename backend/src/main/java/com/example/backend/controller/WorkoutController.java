package com.example.backend.controller;

import com.example.backend.dto.WorkoutDTO;
import com.example.backend.entity.Workout;
import com.example.backend.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/workout")
public class WorkoutController {


    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public ResponseEntity<WorkoutDTO> createWorkout(@RequestBody WorkoutDTO workoutDTO) {
        WorkoutDTO createdWorkout = workoutService.createWorkout(workoutDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{auth0Id}")
    public ResponseEntity<List<Workout>> getWorkouts(@PathVariable String auth0Id) {
        List<Workout> workouts = workoutService.getWorkoutsByUserAuth0Id(auth0Id);
        return ResponseEntity.ok(workouts);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/{workoutId}/toggleFavorite")
    public ResponseEntity<WorkoutDTO> toggleFavorite(@PathVariable Long workoutId) {
        WorkoutDTO updatedWorkout = workoutService.toggleFavorite(workoutId);
        return ResponseEntity.ok(updatedWorkout);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/id/{workoutId}")
    public ResponseEntity<Workout> getWorkoutByID(@PathVariable Long workoutId) {
        Workout workout = workoutService.getWorkoutById(workoutId);
        return ResponseEntity.ok(workout);
    }
}
