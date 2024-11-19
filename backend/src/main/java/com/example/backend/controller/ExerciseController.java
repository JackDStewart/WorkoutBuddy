package com.example.backend.controller;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/by-user")
    public List<Exercise> getExercisesByUser(@RequestParam(required = false) String userId) {
        return exerciseService.getExercisesByUserIdOrNull(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public Exercise createExercise(@RequestBody ExerciseDTO exerciseDTO) {
        return exerciseService.createExercise(exerciseDTO);
    }
}
