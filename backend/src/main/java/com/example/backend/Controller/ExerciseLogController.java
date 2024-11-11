package com.example.backend.Controller;

import com.example.backend.DTO.ExerciseLogDTO;
import com.example.backend.Entity.ExerciseLog;
import com.example.backend.Service.ExerciseLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/log")
public class ExerciseLogController {

    private final ExerciseLogService exerciseLogService;

    @Autowired
    public ExerciseLogController(ExerciseLogService exerciseLogService) {
        this.exerciseLogService = exerciseLogService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/exercises")
    public ResponseEntity<List<ExerciseLog>> addExerciseLogs(@RequestBody List<ExerciseLogDTO> exerciseLogs) {
        List<ExerciseLog> savedLogs = exerciseLogService.saveAll(exerciseLogs);
        return new ResponseEntity<>(savedLogs, HttpStatus.CREATED);
    }
}

