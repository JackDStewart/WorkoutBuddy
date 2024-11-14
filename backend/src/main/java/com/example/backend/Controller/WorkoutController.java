package com.example.backend.Controller;

import com.example.backend.DTO.WorkoutDTO;
import com.example.backend.Entity.Workout;
import com.example.backend.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path="/workout")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public ResponseEntity<?> createWorkout(@RequestBody WorkoutDTO workoutDTO) {
        System.out.println("received create workout request");
        WorkoutDTO createdWorkout = workoutService.createWorkout(workoutDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{auth0Id}")
    public ResponseEntity<?> getWorkouts(@PathVariable String auth0Id) {
        List<Workout> workouts = workoutService.getWorkoutsByUserAuth0Id(auth0Id);
        return ResponseEntity.ok(workouts);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/{workoutId}/toggleFavorite")
    public ResponseEntity<WorkoutDTO> toggleFavorite(@PathVariable Long workoutId) {
        WorkoutDTO updatedWorkout = workoutService.toggleFavorite(workoutId);
        return ResponseEntity.ok(updatedWorkout);
    }

}
