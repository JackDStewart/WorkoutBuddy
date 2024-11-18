package com.example.backend.controller;

import com.example.backend.entity.Exercise;
import com.example.backend.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
